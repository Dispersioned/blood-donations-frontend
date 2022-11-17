import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { canDonate } from 'shared/lib/access/canDonate';
import { isPatient } from 'shared/lib/access/isPatient';
import { Layout } from 'shared/ui/layout';
import { isPrivateIdentifier } from 'typescript';

import { PatientInfo } from './PatientInfo';
import { ViewDonations } from './ViewDonations';

export function Home() {
  const user = useUnit(viewerModel.$user);

  return (
    <Layout title="Мой профиль">
      <Typography fontSize={22}>Имя: {user.username}</Typography>
      <Typography fontSize={22}>Роль: {user.role.value}</Typography>
      <Typography fontSize={22}>
        Тип крови: {user.blood.group}
        {user.blood.rhFactor}
      </Typography>
      {canDonate(user.role.value) && <ViewDonations />}
      {isPatient(user.role.value) && <PatientInfo patientId={user.id} />}
    </Layout>
  );
}
