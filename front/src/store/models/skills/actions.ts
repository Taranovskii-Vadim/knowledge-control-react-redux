import { SelectedCategories } from 'src/store/services/categories/types';
import { Status } from 'src/store/types';
import { createActions, empty } from 'src/utils/store';

import { PATH } from './constants';
import { State, Skill, SkillCategory, SortDirection } from './types';

export const {
  setSkills,
  groupByCategory,
  addSkill,
  changeModalStatus,
  updateSkillRate,
  searchSkill,
  sortByRate,
  fetchSkills,
  postAddSkill,
  putSkillRate,
} = createActions(PATH, {
  setSkills: (skills: State['data']['skills']) => skills,
  groupByCategory: (type: SelectedCategories['type']) => type,
  addSkill: (skill: Skill, activeCategory: SelectedCategories['type']) => ({ skill, activeCategory }),
  changeModalStatus: (status: Status) => status,
  updateSkillRate: (skillId: string, rate: number) => ({ skillId, rate }),
  searchSkill: (type: SelectedCategories['type'], value: string) => ({ type, value }),
  sortByRate: (direction: SortDirection) => direction,
  // async actions
  fetchSkills: empty,
  postAddSkill: (name: string, category: SkillCategory['type'], activeCategory: SelectedCategories['type']) => ({
    name,
    category,
    activeCategory,
  }),
  putSkillRate: (skillId: string, rate: number) => ({ skillId, rate }),
});
