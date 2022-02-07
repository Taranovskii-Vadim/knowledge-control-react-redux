import { createActions } from 'src/utils/store';
import { DIALOGS, PATH } from './constants';

import { ErrorMessage } from './types';

export const { setDialogVisibility } = createActions(PATH, {
  setDialogVisibility: (dialogName: typeof DIALOGS[number], visible: boolean, message?: ErrorMessage) => ({
    dialogName,
    visible,
    message,
  }),
});
