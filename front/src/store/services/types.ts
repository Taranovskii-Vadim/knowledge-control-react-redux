import { State as CategoriesState } from './categories/types';
import { State as AuthenticationState } from './authentication/types';

export type State = { categories: CategoriesState; authentication: AuthenticationState };
