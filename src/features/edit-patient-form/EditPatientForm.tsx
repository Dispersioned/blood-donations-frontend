import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPatient } from 'shared/types';
import { DoctorsAutocomplete } from 'shared/ui/doctors-autocomplete';
import { FormLayout } from 'shared/ui/form-layout';
import { HospitalsAutocomplete } from 'shared/ui/hospitals-autocomplete';
import { Input } from 'shared/ui/input';

import { updatePatientModel } from '.';

type EditPatientFormProps = {
  patient: IPatient;
};

function EditPatientForm({ patient }: EditPatientFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsOpen(false);
    updatePatientModel.update({
      patientId: patient.id,
      username: data.username,
      doctorId: data.doctor.id,
      hospitalId: data.hospital.id,
    });
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Обновить данные пациента</DialogTitle>
        <DialogContent>
          <FormLayout style={{ marginTop: 5 }} id="update_patients_form">
            <Input
              label="ФИО пациента"
              name="username"
              defaultValue={patient.user.username}
              control={control}
              rules={{ required: true }}
              autoFocus
            />
            <DoctorsAutocomplete control={control} defaultValue={patient.doctor} />
            <HospitalsAutocomplete control={control} defaultValue={patient.hospital} />
          </FormLayout>
        </DialogContent>
        <DialogActions>
          <Button form="update_patients_form" onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(EditPatientForm);
