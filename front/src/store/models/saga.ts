import { all } from 'redux-saga/effects';

import skillsSaga from './skills/saga';

const sagas = [skillsSaga];

export default function* modelsSaga() {
  yield all(sagas.map((item) => item()));
}
