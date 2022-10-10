import { Alert, Snackbar } from '@mui/material';
import { useUnit } from 'effector-react';

import { $msg, $shown, $type, closeMessage } from '../model';

export function Message() {
  const msg = useUnit($msg);
  const type = useUnit($type);
  const shown = useUnit($shown);
  const close = useUnit(closeMessage);

  return (
    <Snackbar open={shown} onClose={close}>
      <Alert onClose={close} variant="filled" severity={type || undefined} style={{ fontSize: 17 }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
