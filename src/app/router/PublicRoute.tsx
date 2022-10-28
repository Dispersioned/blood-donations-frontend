import { useUnit } from 'effector-react';
import { $userSys } from 'entities/viewer';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export function PublicRoute() {
  const user = useUnit($userSys);

  if (user) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
}