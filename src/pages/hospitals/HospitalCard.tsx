import { Card, CardContent as MUICardContent, Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { DeleteHospitalForm } from 'features/delete-hospital-form';
import { DonateBloodForm } from 'features/donate-blood-form';
import { UpdateHospitalForm } from 'features/update-hospital-form';
import React from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { IHospital } from 'shared/types';

const CardContent = styled(MUICardContent)`
  display: flex;
  justify-content: space-between;
`;

type HospitalCardProps = {
  hospital: IHospital;
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  const user = useUnit($user);

  return (
    <Card>
      <CardContent>
        <div>
          <Typography variant="h5">{hospital.name}</Typography>
          <Typography color="gray">{hospital.location}</Typography>
        </div>
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
          <DonateBloodForm hospitalId={hospital.id} />
          {isAdmin(user.role.value) && (
            <div style={{ display: 'flex' }}>
              <UpdateHospitalForm hospital={hospital} />
              <DeleteHospitalForm hospitalId={hospital.id} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
