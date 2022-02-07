import { Data } from 'src/store/types';
import { NAVIGATION_ITEM_ID } from './constants';

export interface User {
  readonly id: string;
  email: string;
}
export type State = Data<User, typeof NAVIGATION_ITEM_ID>;
