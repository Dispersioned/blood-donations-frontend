import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { messagerModel } from '..';

function Message() {
  return (
    <Snackbar open={messagerModel.shown} onClose={messagerModel.closeMessage}>
      <Alert
        onClose={messagerModel.closeMessage}
        variant="filled"
        severity={messagerModel.type || undefined}
        style={{ fontSize: 17 }}
      >
        {messagerModel.msg}
      </Alert>
    </Snackbar>
  );
}

export default observer(Message);
