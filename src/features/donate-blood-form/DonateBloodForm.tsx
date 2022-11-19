import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { canDonate } from 'shared/lib/access/canDonate';
import { FormLayout } from 'shared/ui/form-layout';
import { Input } from 'shared/ui/input';

import { donateBloodFormModel } from '.';

type DonateBloodFormProps = React.PropsWithChildren<{
  hospitalId: number;
}>;

export function DonateBloodForm({ hospitalId }: DonateBloodFormProps) {
  const user = useUnit($user);

  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    donateBloodFormModel.donate({
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
          <FormLayout id="donate_blood_form">
            <DialogContentText>Укажите объем сданной крови</DialogContentText>
            <Input autoFocus control={control} label="Объем" name="volume" rules={{ required: true }} />
          </FormLayout>
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
