import { Action } from 'src/utils/types';
import { STATUS } from './constants';
import api from './api';

import { State as ModelsState } from './models/types';
import { State as ServicesState } from './services/types';

export type Status = keyof typeof STATUS;

export interface Data<I, N> {
  data: I;
  status: Status;
  NAVIGATION_ITEM_ID: N;
}

export type QueryValue = string | string[];

export interface SagaContext {
  api: typeof api;
}

export type WorkerParams<P> = Action<string, P>;

export type RootState = { models: ModelsState; services: ServicesState };
