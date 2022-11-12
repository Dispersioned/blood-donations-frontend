import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/ui/input';

import { donateBloodModel } from '.';
import { canDonate } from './lib/canDonate';

type DonateBloodProps = React.PropsWithChildren<{
  hospitalId: number;
}>;

export function DonateBlood({ hospitalId }: DonateBloodProps) {
  const user = useUnit($user);

  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    donateBloodModel.donate({
      volume: +data.volume,
      userId: user.id,
      hospitalId,
    });
  };

  return (
    <div>
      <Button onClick={() => setIsShown(true)} disabled={!canDonate(user.role.value)} variant="contained">
        Сдать кровь
      </Button>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Сдать кровь</DialogTitle>
        <DialogContent>
          <DialogContentText>Укажите объем сданной крови</DialogContentText>
          <form id="donate_blood_form">
            <Input autoFocus control={control} label="Объем" name="volume" rules={{ required: true }} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button form="donate_blood_form" type="submit" onClick={handleSubmit(onSubmit)}>
            Сдать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
