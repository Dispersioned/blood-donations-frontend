import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { patientsModel } from 'entities/patients';
import { RegisterPatientForm } from 'features/register-patient-form';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

export function Patients() {
  useEffect(() => {
    patientsModel.fetch();
  }, []);

  const patients = useUnit(patientsModel.$patients);

  return (
    <Layout title="Пациенты">
      <RegisterPatientForm />
      <div style={{ marginTop: 15 }}>
        {patients.map((patient, i) => (
          <Typography key={patient.id} fontSize={22}>
            {i + 1}.Пациент: {patient.user.username}
          </Typography>
        ))}
      </div>
    </Layout>
  );
}
