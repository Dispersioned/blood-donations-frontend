import { Button, Tooltip } from '@mui/material';
import React from 'react';

type ConfirmRequestProps = {
  requestId: number;
};

export function ConfirmRequest({ requestId }: ConfirmRequestProps) {
  return (
    <Button variant="contained">
      <Tooltip title="Назначенный больной получит кровь">
        <span>Утвердить</span>
      </Tooltip>
    </Button>
  );
}
