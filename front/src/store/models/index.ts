import { combineReducers } from 'src/utils/store';

import { Reducer } from 'src/utils/types';
import { State } from './types';

import skills from './skills';
import dialogs from './dialogs';

export default combineReducers({ skills, dialogs }) as Reducer<State>;
