import { getReducerFor } from 'src/utils/store';
import { setDialogVisibility } from './actions';
import { DIALOGS } from './constants';
import { ServerError, State } from './types';

const initDialogs = DIALOGS.reduce((acc, item) => {
  acc[item] = {
    visible: false,
    message: { e: '' },
  };
  return acc;
}, {} as { [K in typeof DIALOGS[number]]: ServerError });

export default getReducerFor<State>(
  { ...initDialogs },
  setDialogVisibility((state, { dialogName, visible, message }) => {
    state[dialogName] = { visible, message };
  }),
);
