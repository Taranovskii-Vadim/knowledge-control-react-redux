import { AxiosInstance } from 'axios';
import { setDialogVisibility } from './models/dialogs/actions';
import { selectDialogInfo } from './models/dialogs/selectors';

const connectInterceptors = (store: any, instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      const { response } = err;

      const isServerError = selectDialogInfo(store.getState())('serverError');
      if (!isServerError.visible) {
        store.dispatch(setDialogVisibility.actionCreator('serverError', true, { e: err }));
      }
    },
  );
  return instance;
};

export default connectInterceptors;
