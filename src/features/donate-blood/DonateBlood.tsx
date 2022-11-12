import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUnit } from 'effector-react';
import { $userRole } from 'entities/viewer/model';
import React, { useState } from 'react';

import { canDonate } from './lib/canDonate';

type DonateBloodProps = React.PropsWithChildren<{
  hospitalId: number;
}>;

export function DonateBlood({ hospitalId }: DonateBloodProps) {
  const userRole = useUnit($userRole);

  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsShown(true)} disabled={!canDonate(userRole)} variant="contained">
        Сдать кровь
      </Button>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Сдать кровь</DialogTitle>
        <DialogContent>
          <DialogContentText>Укажите объем сданной крови</DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // ...
            }}
          >
            Сдать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
