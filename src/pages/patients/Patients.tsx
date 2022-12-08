import { Button, Typography } from '@mui/material';
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
      {patients.length > 0 ? (
        <div style={{ marginTop: 15 }}>
          {groupPatientsByHospitals(patients).map(([hospitalId, data]) => (
            <div key={hospitalId}>
              <Typography variant="h5" fontWeight="bold">
                {data.hospital.name}
              </Typography>
              {data.patients.map(({ user, doctor, id }, i) => (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    gap: 15,
                  }}
                >
                  <Typography fontSize={22}>{i + 1}.</Typography>
                  <Typography fontSize={22}>{user.username}</Typography>
                  <Typography fontSize={22}>{doctor.username}</Typography>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Typography style={{ marginTop: 15 }}>Пациентов еще нет</Typography>
      )}
    </Layout>
  );
}
