import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { Navigate, Route, Routes } from 'react-router-dom';

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Auth type="login" />} />
      <Route path="/auth/register" element={<Auth type="register" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
