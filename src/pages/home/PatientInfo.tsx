import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { MakeRequestForm } from 'features/make-request-form';
import { useEffect } from 'react';

import { patientInfoModel } from '.';

type PatientInfoProps = {
  patientId: number;
};

export function PatientInfo({ patientId }: PatientInfoProps) {
  useEffect(() => {
    patientInfoModel.fetch({ patientId });
  }, [patientId]);

  const patient = useUnit(patientInfoModel.$patient);

  if (!patient) return null;

  return (
    <div>
      <Typography fontSize={22}>Лечащий врач: {patient.doctor.username}</Typography>
      <Typography fontSize={22}>Больница: {patient.hospital.name}</Typography>
      <MakeRequestForm patient={patient} />
    </div>
  );
}
