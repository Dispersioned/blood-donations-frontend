import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import { $userRole } from 'entities/viewer/model';
import React from 'react';

import { canDonate } from './lib/canDonate';

type DonateBloodProps = React.PropsWithChildren<{
  hospitalId: number;
}>;

export function DonateBlood({ hospitalId }: DonateBloodProps) {
  const userRole = useUnit($userRole);

  return <div>{canDonate(userRole) && <Button variant="contained">Сдать кровь</Button>}</div>;
}
