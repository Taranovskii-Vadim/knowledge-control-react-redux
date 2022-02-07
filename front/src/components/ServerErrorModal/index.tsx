import React from 'react';
import { Modal } from 'antd';

import { connect } from 'src/utils/store';
import { Dispatch } from 'src/utils/types';

import { setDialogVisibility } from 'src/store/models/dialogs/actions';
import { selectDialogInfo } from 'src/store/models/dialogs/selectors';
import { ServerError } from 'src/store/models/dialogs/types';

interface Props {
  serverErrorInfo: ServerError;
  // actions
  setDialogVisibility: Dispatch<typeof setDialogVisibility>;
}

const ServerErrorModalFC = ({ serverErrorInfo, setDialogVisibility }: Props): JSX.Element => {
  const onHandleCloseModal = (): void => {
    setDialogVisibility('serverError', false);
  };
  return (
    <Modal visible={serverErrorInfo.visible} onCancel={onHandleCloseModal}>
      {JSON.stringify(serverErrorInfo.message)}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  serverErrorInfo: selectDialogInfo(state)('serverError'),
});

export const ServerErrorModal = connect(mapStateToProps, { setDialogVisibility })(ServerErrorModalFC);
