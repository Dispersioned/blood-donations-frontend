import { useUnit } from 'effector-react';
import { $authPending, $user } from 'entities/viewer';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { Loading } from 'shared/ui/Loading';

export function PrivateRoute() {
  const user = useUnit($user);

  const pending = useUnit($authPending);

  if (pending) return <Loading />;

  if (!user) return <Navigate to={ROUTES.login} replace />;

  return <Outlet />;
}
