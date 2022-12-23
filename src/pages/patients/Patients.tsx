import { Typography } from '@mui/material';
import { patientsModel } from 'entities/patients';
import { DeleteUserForm, deleteUserModel } from 'features/delete-user-form';
import { RegisterPatientForm } from 'features/register-patient-form';
import { UpdatePatientForm } from 'features/update-patient-form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { groupPatientsByHospitals } from './lib/groupPatientsByHospitals';

function Patients() {
  useEffect(() => {
    patientsModel.fetch();
  }, []);

  return (
    <Layout title="Пациенты">
      <RegisterPatientForm />
      {patientsModel.patients.length > 0 ? (
        <div style={{ marginTop: 15 }}>
          {groupPatientsByHospitals(patientsModel.patients).map(([hospitalId, data]) => (
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
                  <Typography fontSize={22}>Пациент: {patient.user.username}</Typography>
                  <Typography fontSize={22}>Доктор: {patient.doctor.username}</Typography>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <UpdatePatientForm patient={patient} />
                    <DeleteUserForm userId={patient.user.id} handler={deleteUserModel.deletePatient} />
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

export default observer(Patients);
