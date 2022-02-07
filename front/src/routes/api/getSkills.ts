import { Skill, SkillCategory } from 'src/store/models/skills/types';

import { Method, Route } from '../types';
import { API_ENDPOINT } from '../constants';
import { convertDateFromStringToDate } from 'src/utils';

interface SkillDTO {
  readonly id: string;
  name: string;
  rate: number | null;
  category: SkillCategory['type'];
  updatedAt: string;
}

class GetSkills implements Route {
  method: Method = 'GET';

  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  getUrl(): string {
    return `${API_ENDPOINT}/skills`;
  }

  getData(result: SkillDTO[]): Skill[] {
    return result.map((item) => ({
      id: item.id,
      name: item.name,
      rate: item.rate,
      category: item.category,
      creationDate: convertDateFromStringToDate(item.updatedAt),
    }));
  }
}

export default new GetSkills();
