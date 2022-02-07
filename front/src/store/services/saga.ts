import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication/saga';
import categoriesSaga from './categories/saga';

const saga = [categoriesSaga, authenticationSaga];

export default function* servicesSaga() {
  yield all(saga.map((item) => item()));
}
