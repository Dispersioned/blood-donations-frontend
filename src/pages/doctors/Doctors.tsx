import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { doctorsModel } from 'entities/doctors';
import { $user } from 'entities/viewer/model';
import { CreateDoctorForm } from 'features/create-doctor-form';
import { useEffect } from 'react';
import { isAdmin } from 'shared/lib/isAdmin';
import { Layout } from 'shared/ui/layout';

export function Doctors() {
  const user = useUnit($user);

  useEffect(() => {
    doctorsModel.fetch();
  }, []);

  const doctors = useUnit(doctorsModel.$doctors);

  return (
    <Layout title="Доктора">
      {isAdmin(user.role.value) && <CreateDoctorForm />}
      <div style={{ marginTop: 15 }}>
        {doctors.map((doctor, i) => (
          <Typography key={doctor.id} fontSize={22}>
            {i + 1}. {doctor.username}
          </Typography>
        ))}
      </div>
    </Layout>
  );
}
