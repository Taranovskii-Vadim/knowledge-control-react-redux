import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { call } from 'redux-saga/effects';

import { ResponseDTO, Method, Route } from 'src/routes/types';
import { QueryValue } from './types';

const axiosInstance = axios.create({
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
});

(function () {
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['token'] = token;
  }
})();

interface ApiParams {
  headers?: Record<string, string>;
  method?: Method;
  data?: Record<string, any> | FormData | Blob | string;
}

const getAxiosResponse = async (config: AxiosRequestConfig) => await axiosInstance.request(config);

function* api<R extends Route>(
  route: R,
  params?: ApiParams,
  _query?: Record<string, QueryValue>,
  headers?: Record<string, string>,
) {
  let config: AxiosRequestConfig = { method: route.method, url: route.getUrl(_query) };

  if (params) {
    config = { ...config, ...params };
  }

  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }

  const { data }: AxiosResponse<ResponseDTO<any>> = yield call(getAxiosResponse, config);
  return route.getData(data.d.result);
}

api.instance = axiosInstance;

export default api;
