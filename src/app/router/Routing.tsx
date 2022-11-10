import { viewerModel } from 'entities/viewer';
import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { Hospitals } from 'pages/hospitals';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export function Routing() {
  useEffect(() => {
    viewerModel.checkToken();
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.hospitals} element={<Hospitals />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.login} element={<Auth type="login" />} />
        <Route path={ROUTES.register} element={<Auth type="register" />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.login} />} />
    </Routes>
  );
}
