import { SkillCategory } from 'src/store/models/skills/types';
import { Data } from 'src/store/types';

import { NAVIGATION_ITEM_ID } from './constants';

export interface AllCategory {
  type: 'all';
  title: string;
}

export type SelectedCategories = AllCategory | SkillCategory;

export type State = Data<
  { items: SelectedCategories[]; activeCategory: SelectedCategories['type'] },
  typeof NAVIGATION_ITEM_ID
>;
