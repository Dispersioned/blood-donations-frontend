import { Button, Tooltip } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { confirmRequestModel } from '.';

type ConfirmRequestProps = {
  requestId: number;
};

function ConfirmRequest({ requestId }: ConfirmRequestProps) {
  return (
    <Button variant="contained" onClick={() => confirmRequestModel.confirm({ requestId })}>
      <Tooltip title="Назначенный больной получит кровь">
        <span>Утвердить</span>
      </Tooltip>
    </Button>
  );
}

export default observer(ConfirmRequest);
