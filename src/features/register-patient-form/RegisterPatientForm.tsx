import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DoctorsAutocomplete } from 'shared/ui/doctors-autocomplete';
import { RegisterFields } from 'shared/ui/register-fields';

import { registerPatientFormModel } from '.';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`;

export function RegisterPatientForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsOpen(false);
    registerPatientFormModel.register(data);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Добавить пацента
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Добавить пациента</DialogTitle>
        <DialogContent>
          <DialogContentText>Укажите личные данные пациента</DialogContentText>
          <Form id="register_doctor_form">
            <RegisterFields control={control} />
            <DoctorsAutocomplete control={control} />
          </Form>
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
