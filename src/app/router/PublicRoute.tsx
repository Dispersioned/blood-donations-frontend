import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export function PublicRoute() {
  if (viewerModel.user) return <Navigate to={ROUTES.home} replace />;

  return <Outlet />;
}

export default observer(PublicRoute);
