import { put } from 'redux-saga/effects';
import { ofAction } from 'src/utils/store';
import { setCategories } from './actions';

export default function* categoriesSaga() {
  yield put(
    ofAction(setCategories, [
      { type: 'frontend', title: 'Frontend' },
      { type: 'backend', title: 'Backend' },
      { type: 'database', title: 'Базы данных' },
      { type: 'common', title: 'Общие' },
    ]),
  );
}
