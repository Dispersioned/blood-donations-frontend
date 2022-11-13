import { useUnit } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { IRoleName } from 'shared/types';

type RoleRouteProps = {
  roles: IRoleName[];
};

export function RoleRoute({ roles }: RoleRouteProps) {
  const user = useUnit(viewerModel.$user);

  if (!roles.includes(user.role.value)) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
}
