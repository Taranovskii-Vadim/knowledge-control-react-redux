import { combineReducers } from 'src/utils/store';
import { Reducer } from 'src/utils/types';
import { State } from './types';

import categories from './categories';
import authentication from './authentication';

export default combineReducers({ categories, authentication }) as Reducer<State>;
