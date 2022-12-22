import { Typography } from '@mui/material';
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { canDonate } from 'shared/lib/access/canDonate';
import { isPatient } from 'shared/lib/access/isPatient';
import { Layout } from 'shared/ui/layout';

import PatientInfo from './PatientInfo';
import ViewDonations from './ViewDonations';

function Home() {
  const { user } = viewerModel;

  if (!user) return null;

  return (
    <Layout title="Мой профиль">
      <Typography fontSize={22}>ФИО: {user.username}</Typography>
      <Typography fontSize={22}>Роль: {user.role.value}</Typography>
      <Typography fontSize={22}>
        Тип крови: {user.blood.group}
        {user.blood.rhFactor}
      </Typography>
      {canDonate(user.role.value) && <ViewDonations userId={user.id} />}
      {isPatient(user.role.value) && <PatientInfo patientId={user.id} />}
    </Layout>
  );
}

export default observer(Home);
