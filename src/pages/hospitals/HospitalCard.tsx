import { Card, CardContent as MUICardContent, Typography, styled } from '@mui/material';
import { DonateBlood } from 'features/donate-blood';
import React from 'react';
import { IHospital } from 'shared/types';

const CardContent = styled(MUICardContent)`
  display: flex;
  justify-content: space-between;
`;

type HospitalCardProps = {
  hospital: IHospital;
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card>
      <CardContent>
        <div>
          <Typography variant="h5">{hospital.name}</Typography>
          <Typography color="gray">{hospital.location}</Typography>
        </div>
        <DonateBlood hospitalId={hospital.id} />
      </CardContent>
    </Card>
  );
}
