import { convertDateFromStringToDate } from 'src/utils';
import { API_ENDPOINT } from '../constants';
import { Method, Route } from '../types';

interface PostSkillDTO {
  id: string;
  creationAt: string;
}

class PostSkills implements Route {
  method: Method = 'POST';

  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  getUrl(): string {
    return `${API_ENDPOINT}/skills`;
  }

  getData({ id, creationAt }: PostSkillDTO): { id: string; creationDate: Date } {
    return { id, creationDate: convertDateFromStringToDate(creationAt) };
  }
}

export default new PostSkills();
