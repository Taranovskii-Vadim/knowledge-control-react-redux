import { urlFor } from 'src/routes';
import { STATUS } from 'src/store/constants';
import { getReducerFor } from 'src/utils/store';
import { logoutUser, setUser } from './actions';

import { NAVIGATION_ITEM_ID } from './constants';
import { State } from './types';

export default getReducerFor<State>(
  {
    data: null,
    NAVIGATION_ITEM_ID,
    status: STATUS.initial,
  },
  setUser((state, payload) => {
    state.data = payload;
  }),

  logoutUser((state) => {
    localStorage.removeItem('token');
    state.data = null;
    location.href = urlFor('login');
  }),
);
