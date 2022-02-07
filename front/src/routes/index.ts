import { NAVIGATION_ITEMS } from './constants';
import { CommonUrlType } from './types';

export const urlFor = (id: CommonUrlType, params?: { id: string }): string => {
  if (params) {
    return `/${NAVIGATION_ITEMS[id].path}:${params.id}`;
  }
  return `/${NAVIGATION_ITEMS[id].path}`;
};
