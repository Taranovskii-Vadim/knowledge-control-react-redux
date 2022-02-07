import { NAVIGATION_ITEMS } from './constants';

export type CommonUrlType = keyof typeof NAVIGATION_ITEMS;

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface ResponseDTO<D> {
  d: { result: D };
}

export interface Route {
  method: Method;

  headers?: Record<string, string>;

  getUrl(query?: Record<string, unknown>): string;

  getData?(response: any): object | string | number;

  getResponseHeader?(name: string): string;
}
