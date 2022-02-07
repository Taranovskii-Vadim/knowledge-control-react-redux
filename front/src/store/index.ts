import createSagaMiddleWare from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';

// Reducers
import models from './models';
import services from './services';

// Sagas
import modelsSaga from './models/saga';
import servicesSaga from './services/saga';

import { Reducer } from 'src/utils/types';
import { combineReducers } from 'src/utils/store';
import { RootState, SagaContext } from './types';

import { fetchSkills } from './models/skills/actions';

import api from './api';
import connectInterceptors from './interceptors';

const sagaMiddleWate = createSagaMiddleWare<SagaContext>({ context: { api } });

const rootSaga = function* () {
  const sagas = [modelsSaga, servicesSaga];
  yield all(sagas.map((saga) => saga()));
};

const rootReducer: Reducer<RootState> = combineReducers({ models, services });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleWate)));

connectInterceptors(store, api.instance);

sagaMiddleWate.run(rootSaga);

// store.dispatch(fetchSkills.actionCreator());

export default store;
