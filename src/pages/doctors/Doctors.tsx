import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { doctorsModel } from 'entities/doctors';
import { $user } from 'entities/viewer/model';
import { DeleteUserForm, deleteUserFormModel } from 'features/delete-user-form';
import { RegisterDoctorForm } from 'features/register-doctor-form';
import { useEffect } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { Layout } from 'shared/ui/layout';

export function Doctors() {
  const user = useUnit($user);

  useEffect(() => {
    doctorsModel.fetch();
  }, []);

  const doctors = useUnit(doctorsModel.$doctors);
  const deleteDoctor = useUnit(deleteUserFormModel.deleteDoctor);

  return (
    <Layout title="Доктора">
      {isAdmin(user.role.value) && <RegisterDoctorForm />}
      {doctors.length > 0 ? (
        <div style={{ marginTop: 15 }}>
          {doctors.map((doctor, i) => (
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
              <DeleteUserForm userId={doctor.id} handler={deleteDoctor} />
            </div>
          ))}
        </div>
      ) : (
        <Typography style={{ marginTop: 15 }}>Докторов еще нет</Typography>
      )}
    </Layout>
  );
}
