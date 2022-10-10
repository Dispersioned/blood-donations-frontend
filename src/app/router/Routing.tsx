import { useUnit } from 'effector-react';
import { $user, checkToken } from 'entities/viewer';
import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { Hospitals } from 'pages/hospitals';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

import { PrivateRoute } from './PrivateRoute';

export function Routing() {
  const navigate = useNavigate();

  const user = useUnit($user);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (user) navigate(ROUTES.home);
    // do not include navigate in deps array
  }, [user]);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.hospitals} element={<Hospitals />} />
      </Route>
      <Route path={ROUTES.login} element={<Auth type="login" />} />
      <Route path={ROUTES.register} element={<Auth type="register" />} />
      <Route path="*" element={<Navigate to={ROUTES.login} />} />
    </Routes>
  );
}
