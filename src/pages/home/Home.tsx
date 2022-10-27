import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer';
import { Layout } from 'shared/ui/layout';

export function Home() {
  const user = useUnit($user);

  return (
    <Layout>
      <Typography variant="h2">Мой профиль</Typography>
      <Typography fontSize={22}>Имя: {user.username}</Typography>
      <Typography fontSize={22}>Роль: {user.role.value}</Typography>
      <Typography fontSize={22}>
        Тип крови: {user.blood.group}
        {user.blood.rhFactor}
      </Typography>
    </Layout>
  );
}
