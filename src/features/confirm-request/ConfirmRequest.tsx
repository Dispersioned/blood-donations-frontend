import { Button, Tooltip } from '@mui/material';
import React from 'react';

import { confirmRequestModel } from '.';

type ConfirmRequestProps = {
  requestId: number;
};

export function ConfirmRequest({ requestId }: ConfirmRequestProps) {
  return (
    <Button variant="contained" onClick={() => confirmRequestModel.confirm({ requestId })}>
      <Tooltip title="Назначенный больной получит кровь">
        <span>Утвердить</span>
      </Tooltip>
    </Button>
  );
}
