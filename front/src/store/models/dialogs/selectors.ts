import { createSelector } from 'reselect';

import { getBaseModels } from '../selectors';
import { DIALOGS } from './constants';
import { ServerError, State } from './types';

const getBase = createSelector(getBaseModels, (state) => state.dialogs);

export const selectDialogInfo = createSelector(
  getBase,
  (state: State): ((dialogName: typeof DIALOGS[number]) => ServerError) =>
    (dialogName) =>
      state[dialogName],
);
