import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export function PrivateRoute() {
  const user = useUnit($user);

  if (!user) return <Navigate to={ROUTES.login} replace />;

  return <Outlet />;
}
