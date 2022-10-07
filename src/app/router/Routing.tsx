import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export function Routing() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.login} element={<Auth type="login" />} />
      <Route path={ROUTES.register} element={<Auth type="register" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
