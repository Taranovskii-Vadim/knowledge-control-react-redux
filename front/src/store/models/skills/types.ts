import { Data, Status } from 'src/store/types';

import { NAVIGATION_ITEM_ID } from './constants';

export interface SkillCategory {
  type: 'frontend' | 'backend' | 'database' | 'common';
  title: string;
}

export type SortDirection = 'ASC' | 'DESC';

export interface GraphData {
  type: string;
  value: number;
}

export interface Skill {
  readonly id: string;
  name: string;
  rate: number | null;
  category: SkillCategory['type'];
  creationDate: Date;
}

export type State = Data<{ skills: Skill[]; latest: Skill[]; modalStatus: Status }, typeof NAVIGATION_ITEM_ID>;
