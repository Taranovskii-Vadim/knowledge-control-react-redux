import { State as SkillsState } from './skills/types';
import { State as DialogsState } from './dialogs/types';

export type State = {
  skills: SkillsState;
  dialogs: DialogsState;
};
