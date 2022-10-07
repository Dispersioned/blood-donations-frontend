import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routing } from './router';
import './styles/reset.css';

export function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}
