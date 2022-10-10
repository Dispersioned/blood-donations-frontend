import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export function PublicRoute() {
  const user = useUnit($user);

  if (user) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
}
