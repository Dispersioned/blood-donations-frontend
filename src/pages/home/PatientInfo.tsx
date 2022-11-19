import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { patientInfoModel } from '.';

type PatientInfoProps = {
  patientId: number;
};

export function PatientInfo({ patientId }: PatientInfoProps) {
  useEffect(() => {
    patientInfoModel.fetch({ patientId });
  }, [patientId]);

  const patientInfo = useUnit(patientInfoModel.$patientInfo);

  if (!patientInfo) return null;

  return (
    <div>
      <Typography fontSize={22}>Лечащий врач: {patientInfo.doctor.username}</Typography>
      <Typography fontSize={22}>Больница: {patientInfo.hospital.name}</Typography>
    </div>
  );
}
