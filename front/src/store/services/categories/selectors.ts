import { createSelector } from 'reselect';
import { selectServices } from '../selectors';

const getBase = createSelector(selectServices, (state) => state.categories);

export const selectCategories = createSelector(getBase, (state) => state.data.items);

export const selectActiveCategory = createSelector(getBase, (state) => state.data.activeCategory);
