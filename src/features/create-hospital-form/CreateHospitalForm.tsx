import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { FormLayout } from 'shared/ui/form-layout';
import { Input } from 'shared/ui/input';

import { createHospitalModel } from '.';

export function CreateHospitalForm() {
  const user = useUnit($user);

  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    createHospitalModel.create({
      name: data.name,
      location: data.location,
    });
  };

  return (
    <div>
      <Button onClick={() => setIsShown(true)} disabled={!isAdmin(user.role.value)} variant="contained">
        Создать больницу
      </Button>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Создать больницу</DialogTitle>
        <DialogContent>
          <FormLayout id="create_hospital_form">
            <DialogContentText>Укажите данные больницу</DialogContentText>
            <Input control={control} label="Название" name="name" rules={{ required: true }} />
            <Input control={control} label="Адрес" name="location" rules={{ required: true }} />
          </FormLayout>
        </DialogContent>
        <DialogActions>
          <Button form="create_hospital_form" type="submit" onClick={handleSubmit(onSubmit)}>
            Сдать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
