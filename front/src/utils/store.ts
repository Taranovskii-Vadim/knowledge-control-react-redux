import { produce } from 'immer';
import { connect as reactReduxConnect, InferableComponentEnhancerWithProps } from 'react-redux';
import { combineReducers as reduxCombineReducers } from 'redux';
import { getContext } from 'redux-saga/effects';

import { SagaContext } from 'src/store/types';

import * as Types from './types';

const actionTypesCache = {};
const hasOwn = actionTypesCache.hasOwnProperty;

export const empty = (): void => {};

const createAction = <T extends string, A extends unknown[], R>(
  type: T,
  getPayload: (...args: A) => R,
  produceFN: Types.Produce,
): Types.ActionFn<T, (...args: A) => R> => {
  if (hasOwn.call(actionTypesCache, type)) {
    throw new Error(`Action with type ${type} already exists`);
  }

  actionTypesCache[type as string] = true;

  let actionCreator: Types.ActionCreator<T, (...args: A) => R>;

  if (getPayload === empty) {
    const action = { type } as unknown as Types.Action<T, R>;

    actionCreator = () => action;
  } else {
    actionCreator = (...args: A) => ({
      type,
      payload: getPayload(...args),
    });
  }

  const actionFn: Types.ActionFn<T, (...args: A) => R> = (draftHandler) => ({
    type,
    handler: produceFN(draftHandler),
  });

  actionFn.actionCreator = actionCreator;
  actionFn.toString = () => type;

  return actionFn;
};

export const getActionType = <T extends string, P extends Types.PayloadCreator>(action: Types.ActionFn<T, P>): string =>
  action.toString();

const generateActionType = <PT extends string[], M extends Types.PayloadCreatorsMap>(
  path: PT,
  key: Extract<keyof M, string>,
) => `${path.join('/')}:${key}` as typeof key;

const getCreateActions =
  (produceFN: Types.Produce) =>
  <PT extends string[], M extends Types.PayloadCreatorsMap>(path: PT, handlersMap: M): Types.ActionFnsMap<M> => {
    const actions = {} as Types.ActionFnsMap<M>;

    for (const key in handlersMap) {
      const type = generateActionType(path, key);
      actions[key] = createAction(type, handlersMap[key], produceFN);
    }

    return actions;
  };

export const createActions = getCreateActions(produce);

export const combineReducers = <S>(reducersMap: Types.ReducersMap<S>): Types.Reducer<S> =>
  reduxCombineReducers(reducersMap);

export const connect = <OwnProps = {}, StateProps = {}, State = {}, Actions extends Types.ActionFnsMap<any> = {}>(
  mapStateToProps: Types.MapStateToProps<OwnProps, StateProps, State>,
  actions: Actions,
): InferableComponentEnhancerWithProps<StateProps & Types.ActionCreatorsMap<Actions>, OwnProps> => {
  const actionCreatorsMap = {} as Types.ActionCreatorsMap<Actions>;

  for (const key in actions) {
    actionCreatorsMap[key] = actions[key].actionCreator;
  }

  return reactReduxConnect(mapStateToProps, actionCreatorsMap);
};

export function* getSagaContext(contextKey: keyof SagaContext) {
  const context: SagaContext[typeof contextKey] = yield getContext(contextKey);
  return context;
}

export const ofAction = <T extends string, P extends Types.PayloadCreator>(
  action: Types.ActionFn<T, P>,
  ...args: Parameters<P>
) => {
  const { actionCreator } = action;

  return actionCreator(...args);
};

export const getReducerFor = <S>(
  initialState: S,
  ...handlers: Types.HandlerWithType<Types.Draft<S>>[]
): Types.Reducer<S> => {
  const handlersMap = {};

  if (handlers.length === 0) {
    return (state: S = initialState): S => state;
  }

  handlers.forEach(({ type, handler }) => {
    handlersMap[type] = handler;
  });

  return (state: S = initialState, { type, payload }: Types.AnyAction): S => {
    if (hasOwn.call(handlersMap, type) === false) {
      return state;
    }

    return handlersMap[type](state, payload);
  };
};
