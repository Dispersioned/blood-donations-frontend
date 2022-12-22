import { Typography } from '@mui/material';
import { doctorsModel } from 'entities/doctors';
import { viewerModel } from 'entities/viewer';
import { DeleteUserForm, deleteUserModel } from 'features/delete-user-form';
import { EditDoctorForm } from 'features/edit-doctor-form';
import { RegisterDoctorForm } from 'features/register-doctor-form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { Layout } from 'shared/ui/layout';

function Doctors() {
  useEffect(() => {
    doctorsModel.fetch();
  }, []);

  return (
    <Layout title="Доктора">
      {viewerModel.user && isAdmin(viewerModel.user.role.value) && <RegisterDoctorForm />}
      {doctorsModel.doctors.length > 0 ? (
        <div style={{ marginTop: 15 }}>
          {doctorsModel.doctors.map((doctor, i) => (
            <div
              key={doctor.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Typography fontSize={22}>{i + 1}.</Typography>
              <Typography fontSize={22}>{doctor.username}</Typography>
              <div style={{ display: 'flex' }}>
                <EditDoctorForm doctor={doctor} />
                <DeleteUserForm userId={doctor.id} handler={deleteUserModel.deleteDoctor} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Typography style={{ marginTop: 15 }}>Докторов еще нет</Typography>
      )}
    </Layout>
  );
}

export default observer(Doctors);
