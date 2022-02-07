import { STATUS } from 'src/store/constants';
import { getReducerFor } from 'src/utils/store';
import { State } from './types';

import { ALL_CATEGORY, NAVIGATION_ITEM_ID } from './constants';
import { setActiveCategory, setCategories } from './actions';

export default getReducerFor<State>(
  {
    data: {
      items: [],
      activeCategory: ALL_CATEGORY.type,
    },
    NAVIGATION_ITEM_ID,
    status: STATUS.initial,
  },
  setCategories((state, payload) => {
    state.data.items = [ALL_CATEGORY, ...payload];
  }),
  setActiveCategory((state, payload) => {
    state.data.activeCategory = payload;
  }),
);
