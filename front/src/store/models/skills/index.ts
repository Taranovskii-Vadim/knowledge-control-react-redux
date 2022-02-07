import { STATUS } from 'src/store/constants';
import { getReducerFor } from 'src/utils/store';

import { State } from './types';
import {
  changeModalStatus,
  groupByCategory,
  addSkill,
  setSkills,
  updateSkillRate,
  searchSkill,
  sortByRate,
} from './actions';
import { NAVIGATION_ITEM_ID } from './constants';

let hashedSkills: State['data']['skills'] = [];

export default getReducerFor<State>(
  {
    data: {
      skills: [],
      latest: [],
      modalStatus: STATUS.initial,
    },
    status: STATUS.initial,
    NAVIGATION_ITEM_ID,
  },

  groupByCategory((state, payload) => {
    state.data.skills = payload === 'all' ? hashedSkills : hashedSkills.filter((item) => item.category === payload);
  }),

  setSkills((state, payload) => {
    state.data.skills = payload;
    if (payload.length >= 3) {
      state.data.latest = [payload[0], payload[1], payload[2]];
    }
    hashedSkills = payload;
  }),

  addSkill((state, { skill, activeCategory }) => {
    if (activeCategory === 'all' || activeCategory === skill.category) {
      state.data.skills.unshift(skill);
    }
    state.data.latest = [skill, ...state.data.latest.slice(0, 2)];
    hashedSkills = [...hashedSkills, skill];
    state.data.modalStatus = STATUS.done;
  }),

  updateSkillRate((state, { skillId, rate }) => {
    state.data.skills = state.data.skills.map((item) => {
      if (item.id === skillId) {
        item.rate = rate;
      }
      return item;
    });
  }),

  searchSkill((state, { type, value }) => {
    const typeMatchedSkills = type === 'all' ? hashedSkills : hashedSkills.filter((item) => item.category === type);
    state.data.skills = typeMatchedSkills.filter((item) => item.name.toLowerCase().startsWith(value));
  }),

  sortByRate((state, payload) => {
    state.data.skills = state.data.skills.sort((a, b) => {
      if (payload === 'ASC') {
        return a.rate - b.rate;
      }
      return b.rate - a.rate;
    });
  }),

  changeModalStatus((state, payload) => {
    state.data.modalStatus = payload;
  }),
);
