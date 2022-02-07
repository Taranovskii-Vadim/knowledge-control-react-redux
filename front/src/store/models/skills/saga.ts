import { put, takeEvery } from 'redux-saga/effects';
import { STATUS } from 'src/store/constants';
import { getActionType, getSagaContext, ofAction } from 'src/utils/store';
import { SagaContext, WorkerParams } from 'src/store/types';

import { SkillCategory } from './types';
import {
  changeModalStatus,
  addSkill,
  setSkills,
  fetchSkills,
  postAddSkill,
  putSkillRate,
  updateSkillRate,
} from './actions';

import getSkills from 'src/routes/api/getSkills';
import postSkill from 'src/routes/api/postSkill';
import putSkillRateRequest from 'src/routes/api/putSkillRate';

function* fetchSkillsWorker() {
  try {
    const api: SagaContext['api'] = yield getSagaContext('api');
    const data = yield api(getSkills);
    yield put(ofAction(setSkills, data));
  } catch (e) {
    // console.error(e);
  }
}

function* postNewSkillWorker({
  payload,
}: WorkerParams<{ name: string; category: SkillCategory['type']; activeCategory: SkillCategory['type'] }>) {
  try {
    const { name, category, activeCategory } = payload;
    yield put(ofAction(changeModalStatus, STATUS.loading));
    const api: SagaContext['api'] = yield getSagaContext('api');
    const { id, creationDate } = yield api(postSkill, { data: { name, category } });
    yield put(ofAction(addSkill, { id, name, category, rate: null, creationDate }, activeCategory));
  } catch (e) {
    yield put(ofAction(changeModalStatus, STATUS.error));
  }
}

function* putSkillRateWorker({ payload }: WorkerParams<{ skillId: string; rate: number }>) {
  try {
    const { skillId, rate } = payload;
    const api: SagaContext['api'] = yield getSagaContext('api');
    yield api(putSkillRateRequest, { data: { rate } }, { skillId });
    yield put(ofAction(updateSkillRate, skillId, rate));
  } catch (e) {
    console.log(e);
  }
}

export default function* skillsSaga() {
  yield takeEvery(getActionType(fetchSkills), fetchSkillsWorker);
  yield takeEvery(getActionType(postAddSkill), postNewSkillWorker);
  yield takeEvery(getActionType(putSkillRate), putSkillRateWorker);
}
