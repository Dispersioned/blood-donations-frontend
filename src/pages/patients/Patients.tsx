import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { patientsModel } from 'entities/patients';
import { RegisterPatientForm } from 'features/register-patient-form';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { groupPatientsByHospitals } from './lib/groupPatientsByHospitals';

export function Patients() {
  useEffect(() => {
    patientsModel.fetch();
  }, []);

  const patients = useUnit(patientsModel.$patients);

  return (
    <Layout title="Пациенты">
      <RegisterPatientForm />
      <div style={{ marginTop: 15 }}>
        {groupPatientsByHospitals(patients).map(([hospitalId, data]) => (
          <div key={hospitalId}>
            <Typography variant="h5" fontWeight="bold">
              {data.hospital.name}
            </Typography>
            {data.patients.map(({ user, doctor, id }, i) => (
              <Typography key={id} fontSize={22}>
                {i + 1}. Пациент: {user.username} Доктор {doctor.username}
              </Typography>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
}
