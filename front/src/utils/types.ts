interface Handler<S, P, R> {
  (state: S, payload: P): R;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export interface PayloadCreator {
  (...args: any): any;
}

interface ActionFnBody<P> {
  <S>(draftHandler: Handler<S, P, any>): HandlerWithType<S>;
}

export interface ActionCreator<T, C extends PayloadCreator> {
  (...args: Parameters<C>): Action<T, ReturnType<C>>;
}

export interface ActionFn<T, C extends PayloadCreator> extends ActionFnBody<ReturnType<C>> {
  actionCreator: ActionCreator<T, C>;
  toString: () => T;
}

type CommonType =
  | Function
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>
  | Promise<any>
  | boolean
  | number
  | string
  | Date
  | RegExp;

export interface HandlerWithType<S> {
  readonly type: string;
  readonly handler: Handler<S, any, S>;
}

export type MapStateToProps<OwnProps, StateProps, State> =
  | ((state: State, ownProps: OwnProps) => StateProps)
  | null
  | undefined;

// eslint-disable-next-line
export interface AnyActionFn extends ActionFn<string, any> {}

export type Dispatch<A extends AnyActionFn> = A['actionCreator'];

export type Draft<T> = T extends CommonType ? T : T extends object ? { -readonly [K in keyof T]: Draft<T[K]> } : T;

// eslint-disable-next-line
export interface Reducer<S> extends Handler<S | undefined, AnyAction, S> {}

export type ReducersMap<S> = {
  [K in keyof S]: Reducer<S[K]>;
};
// eslint-disable-next-line
export interface AnyAction extends Action<string, unknown> {}

export type PayloadCreatorsMap = Record<string, PayloadCreator>;

export type ActionFnsMap<P extends PayloadCreatorsMap> = {
  [K in keyof P]: ActionFn<K, P[K]>;
};

export type ActionCreatorsMap<M extends ActionFnsMap<any>> = {
  [K in keyof M]: Dispatch<M[K]>;
};

export interface Produce {
  <S, P>(draftHandler: Handler<S, P, any>): Handler<S, P, S>;
}
