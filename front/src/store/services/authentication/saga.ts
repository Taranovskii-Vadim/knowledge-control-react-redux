import { call, put, takeEvery } from '@redux-saga/core/effects';

import { SagaContext, WorkerParams } from 'src/store/types';
import { getActionType, getSagaContext, ofAction } from 'src/utils/store';
import { getUserData, loginUser, setUser } from './actions';

import postLogin from 'src/routes/api/postLogin';
import { User } from './types';
import getUser from 'src/routes/api/getUser';

function* loginUserWorker({ payload }: WorkerParams<{ email: string; password: string }>) {
  try {
    const api: SagaContext['api'] = yield getSagaContext('api');
    const token: string = yield api(postLogin, { data: payload });
    localStorage.setItem('token', token);
    location.href = '/';
  } catch (e) {
    console.log(e);
  }
}

function* getUserDataWorker() {
  try {
    const api: SagaContext['api'] = yield getSagaContext('api');
    const data: User = yield api(getUser);
    yield put(ofAction(setUser, data));
  } catch (e) {
    console.log(e);
  }
}

export default function* authenticationSaga() {
  yield takeEvery(getActionType(loginUser), loginUserWorker);
  yield takeEvery(getActionType(getUserData), getUserDataWorker);
}
