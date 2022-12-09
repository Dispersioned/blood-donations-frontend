import { Button, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { patientsModel } from 'entities/patients';
import { DeleteUserForm, deleteUserFormModel } from 'features/delete-user-form';
import { EditPatientForm } from 'features/edit-patient-form';
import { RegisterPatientForm } from 'features/register-patient-form';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { groupPatientsByHospitals } from './lib/groupPatientsByHospitals';

export function Patients() {
  useEffect(() => {
    patientsModel.fetch();
  }, []);

  const patients = useUnit(patientsModel.$patients);
  const deletePatient = useUnit(deleteUserFormModel.deletePatient);

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
              {data.patients.map((patient, i) => (
                <div
                  key={patient.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Typography fontSize={22}>{i + 1}.</Typography>
                  <Typography fontSize={22}>{patient.user.username}</Typography>
                  <Typography fontSize={22}>{patient.doctor.username}</Typography>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <EditPatientForm patient={patient} />
                    <DeleteUserForm userId={patient.user.id} handler={deletePatient} />
                  </div>
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
