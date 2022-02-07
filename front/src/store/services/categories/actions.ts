import { createActions } from 'src/utils/store';
import { PATH } from './constants';
import { SelectedCategories, State } from './types';

export const { setCategories, setActiveCategory } = createActions(PATH, {
  setCategories: (data: State['data']['items']) => data,
  setActiveCategory: (data: SelectedCategories['type']) => data,
});
