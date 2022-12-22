import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { Loading } from 'shared/ui/loading';

function PrivateRoute() {
  if (!viewerModel.isFetched) return <Loading />;

  if (!viewerModel.user) return <Navigate to={ROUTES.login} replace />;

  return <Outlet />;
}

export default observer(PrivateRoute);
