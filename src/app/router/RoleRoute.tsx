import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { IRoleName } from 'shared/types';

type RoleRouteProps = {
  roles: IRoleName[];
};

function RoleRoute({ roles }: RoleRouteProps) {
  if (viewerModel.user && !roles.includes(viewerModel.user.role.value)) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
}

export default observer(RoleRoute);
