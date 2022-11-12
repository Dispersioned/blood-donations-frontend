import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { IHospital } from 'shared/types';

type HospitalCardProps = React.PropsWithChildren<{
  hospital: IHospital;
}>;

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{hospital.name}</Typography>
        <Typography color="gray">{hospital.location}</Typography>
      </CardContent>
    </Card>
  );
}
