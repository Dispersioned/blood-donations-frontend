import { Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';

import { patientInfoModel } from '.';

type PatientInfoProps = {
  patientId: number;
};

const Wrapper = styled('div')`
  margin-top: 10px;
`;

const Flex = styled('div')`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export function PatientInfo({ patientId }: PatientInfoProps) {
  useEffect(() => {
    patientInfoModel.fetch({ patientId });
  }, [patientId]);

  const patientInfo = useUnit(patientInfoModel.$patientInfo);

  if (!patientInfo) return null;

  return (
    <Wrapper>
      <Flex>
        <Typography variant="h5">Лечащий врач:</Typography>
        <Typography variant="h6">{patientInfo.doctor.username}</Typography>
      </Flex>
      <Flex>
        <Typography variant="h5">Больница:</Typography>
        <Typography variant="h6">{patientInfo.hospital.name}</Typography>
      </Flex>
    </Wrapper>
  );
}
