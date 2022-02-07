import { API_ENDPOINT } from '../constants';
import { Method, Route } from '../types';

class PostLogin implements Route {
  method: Method = 'POST';

  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  getUrl(): string {
    return `${API_ENDPOINT}/auth/login`;
  }

  getData(result: string): string {
    return result;
  }
}

export default new PostLogin();
