import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { doctorsModel } from 'entities/doctors';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLayout } from 'shared/ui/form-layout';
import { RegisterFields } from 'shared/ui/register-fields';

function RegisterDoctorForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsOpen(false);
    doctorsModel.register(data);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Добавить доктора
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Добавить доктора</DialogTitle>
        <DialogContent>
          <FormLayout id="register_doctor_form">
            <DialogContentText>Укажите личные данные доктора</DialogContentText>
            <RegisterFields control={control} />
          </FormLayout>
        </DialogContent>
        <DialogActions>
          <Button form="register_doctor_form" onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(RegisterDoctorForm);
