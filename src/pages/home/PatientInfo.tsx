import { Typography } from '@mui/material';
import { MakeRequestForm } from 'features/make-request-form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { patientInfoModel } from '.';

type PatientInfoProps = {
  patientId: number;
};

function PatientInfo({ patientId }: PatientInfoProps) {
  useEffect(() => {
    patientInfoModel.fetch({ patientId });
  }, [patientId]);

  if (!patientInfoModel.patient) return null;

  return (
    <div>
      <Typography fontSize={22}>Лечащий врач: {patientInfoModel.patient.doctor.username}</Typography>
      <Typography fontSize={22}>Больница: {patientInfoModel.patient.hospital.name}</Typography>
      <MakeRequestForm patient={patientInfoModel.patient} />
    </div>
  );
}

export default observer(PatientInfo);
