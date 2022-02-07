const ROOT_NAVIGATION_ITEMS = {
  general: {
    path: '',
  },
  login: {
    path: 'login',
  },
  logout: {
    path: 'logout',
  },
};

export const API_ENDPOINT = '/api';

export const NAVIGATION_ITEMS = {
  ...ROOT_NAVIGATION_ITEMS,
} as const;
