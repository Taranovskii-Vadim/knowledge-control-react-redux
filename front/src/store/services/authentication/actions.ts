import { createActions, empty } from 'src/utils/store';
import { PATH } from './constants';
import { State } from './types';

export const { loginUser, setUser, getUserData, logoutUser } = createActions(PATH, {
  setUser: (user: State['data']) => user,
  loginUser: (email: string, password: string) => ({ email, password }),
  logoutUser: empty,
  getUserData: empty,
});
