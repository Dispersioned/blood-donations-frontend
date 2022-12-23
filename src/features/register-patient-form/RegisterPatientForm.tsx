import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { patientsModel } from 'entities/patients';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DoctorsAutocomplete } from 'shared/ui/doctors-autocomplete';
import { FormLayout } from 'shared/ui/form-layout';
import { HospitalsAutocomplete } from 'shared/ui/hospitals-autocomplete';
import { RegisterFields } from 'shared/ui/register-fields';

function RegisterPatientForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsOpen(false);
    patientsModel.register(data);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Добавить пациента
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Добавить пациента</DialogTitle>
        <DialogContent>
          <FormLayout id="register_doctor_form">
            <DialogContentText>Укажите личные данные пациента</DialogContentText>
            <RegisterFields control={control} />
            <DoctorsAutocomplete control={control} />
            <HospitalsAutocomplete control={control} />
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

export default observer(RegisterPatientForm);
