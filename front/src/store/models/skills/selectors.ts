import { createSelector } from 'reselect';
import { capitalizeFirstLetter } from 'src/utils';

import { getBaseModels } from '../selectors';
import { GraphData } from './types';

const getBase = createSelector(getBaseModels, (state) => state.skills);

const selectData = createSelector(getBase, (state) => state.data);

export const selectSkills = createSelector(selectData, (state) => state.skills);

export const selectAddModalStatus = createSelector(selectData, (state) => state.modalStatus);

export const selectCategroiesForPieGraph = createSelector(selectData, (state) => {
  const totalCount: { [key: string]: number } = state.skills.reduce((acc, { category, rate }) => {
    if (rate) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  const result: GraphData[] = Object.keys(totalCount).map((key) => ({
    type: capitalizeFirstLetter(key),
    value: totalCount[key],
  }));

  return result;
});

export const selectDataForStarsGraph = createSelector(selectData, ({ skills }) => {
  const result = skills.reduce((acc, { rate }) => {
    acc[rate] = (acc[rate] || 0) + 1;
    return acc;
  }, {});

  return result;
});

export const selectLatest = createSelector(selectData, ({ latest }) => latest);
