import { useUnit } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { Loading } from 'shared/ui/loading';

export function PrivateRoute() {
  const user = useUnit(viewerModel.$userSys);

  const pending = useUnit(viewerModel.$authPending);

  if (pending) return <Loading />;

  if (!user) return <Navigate to={ROUTES.login} replace />;

  return <Outlet />;
}
