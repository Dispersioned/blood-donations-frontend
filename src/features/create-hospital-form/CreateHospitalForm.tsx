import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { hospitalsModel } from 'entities/hospitals';
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { FormLayout } from 'shared/ui/form-layout';
import { Input } from 'shared/ui/input';

function CreateHospitalForm() {
  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    hospitalsModel.create({
      name: data.name,
      location: data.location,
    });
  };

  return (
    <div>
      <Button
        onClick={() => setIsShown(true)}
        disabled={!!viewerModel.user && !isAdmin(viewerModel.user.role.value)}
        variant="contained"
      >
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
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(CreateHospitalForm);
