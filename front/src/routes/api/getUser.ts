import { API_ENDPOINT } from '../constants';
import { Method, Route } from '../types';

class GetUser implements Route {
  method: Method = 'GET';

  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  getUrl(): string {
    return `${API_ENDPOINT}/auth/me`;
  }

  getData(result: string): string {
    return result;
  }
}

export default new GetUser();
