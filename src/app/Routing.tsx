import { Route, Routes } from 'react-router-dom';

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
    </Routes>
  );
}
