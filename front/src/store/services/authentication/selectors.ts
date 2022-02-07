import { createSelector } from 'reselect';
import { selectServices } from '../selectors';

const getBase = createSelector(selectServices, (state) => state.authentication);

export const selectUser = createSelector(getBase, (state) => state.data);
