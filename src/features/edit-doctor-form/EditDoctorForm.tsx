import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { IUser } from 'shared/types';
import { FormLayout } from 'shared/ui/form-layout';
import { Input } from 'shared/ui/input';

import { editDoctorFormModel } from '.';

type EditDoctorFormProps = {
  doctor: IUser;
};

export function EditDoctorForm({ doctor }: EditDoctorFormProps) {
  const user = useUnit($user);
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsOpen(false);
    editDoctorFormModel.update({
      userId: doctor.id,
      username: data.username,
    });
  };

  return (
    <>
      {isAdmin(user.role.value) && (
        <IconButton onClick={() => setIsOpen(true)}>
          <EditIcon />
        </IconButton>
      )}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Обновить данные доктора</DialogTitle>
        <DialogContent>
          <FormLayout style={{ marginTop: 5 }} id="update_doctor_form">
            <Input
              label="ФИО доктора"
              name="username"
              defaultValue={doctor.username}
              control={control}
              rules={{ required: true }}
              autoFocus
            />
          </FormLayout>
        </DialogContent>
        <DialogActions>
          <Button form="update_doctor_form" onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
