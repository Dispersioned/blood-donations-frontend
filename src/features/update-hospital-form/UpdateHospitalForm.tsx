import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { hospitalsModel } from 'entities/hospitals';
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { IHospital } from 'shared/types';
import { FormLayout } from 'shared/ui/form-layout';
import { Input } from 'shared/ui/input';

type DonateBloodFormProps = {
  hospital: IHospital;
};

function UpdateHospitalForm({ hospital }: DonateBloodFormProps) {
  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    hospitalsModel.update({
      hospitalId: hospital.id,
      name: data.name,
      location: data.location,
    });
  };

  return (
    <div>
      <IconButton
        onClick={() => setIsShown(true)}
        disabled={!!viewerModel.user && !isAdmin(viewerModel.user.role.value)}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Изменить больницу</DialogTitle>
        <DialogContent>
          <FormLayout style={{ marginTop: 5 }} id="create_hospital_form">
            <Input
              control={control}
              label="Название"
              name="name"
              defaultValue={hospital.name}
              rules={{ required: true }}
            />
            <Input
              control={control}
              label="Адрес"
              name="location"
              defaultValue={hospital.location}
              rules={{ required: true }}
            />
          </FormLayout>
        </DialogContent>
        <DialogActions>
          <Button form="create_hospital_form" type="submit" onClick={handleSubmit(onSubmit)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(UpdateHospitalForm);
