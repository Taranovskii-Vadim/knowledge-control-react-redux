import { API_ENDPOINT } from '../constants';
import { Method, Route } from '../types';

class PutSkillRateRequest implements Route {
  method: Method = 'POST';

  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  getUrl({ skillId }: { skillId: number }): string {
    return `${API_ENDPOINT}/skills/${skillId}`;
  }

  getData(result: string): string {
    return result;
  }
}

export default new PutSkillRateRequest();
