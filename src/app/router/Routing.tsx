import { viewerModel } from 'entities/viewer';
import { Auth } from 'pages/auth';
import { Doctors } from 'pages/doctors';
import { Home } from 'pages/home';
import { Hospitals } from 'pages/hospitals';
import { Patients } from 'pages/patients';
import { Requests } from 'pages/requests';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { RoleRoute } from './RoleRoute';

export function Routing() {
  useEffect(() => {
    viewerModel.checkToken();
  }, []);

  // TODO create v6.4 router instead
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.hospitals} element={<Hospitals />} />
        <Route element={<RoleRoute roles={['PATIENT', 'DOCTOR', 'ADMIN']} />}>
          <Route path={ROUTES.requests} element={<Requests />} />
        </Route>
        <Route element={<RoleRoute roles={['ADMIN', 'DOCTOR']} />}>
          <Route path={ROUTES.doctors} element={<Doctors />} />
          <Route path={ROUTES.patients} element={<Patients />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.login} element={<Auth type="login" />} />
        <Route path={ROUTES.register} element={<Auth type="register" />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.login} />} />
    </Routes>
  );
}
