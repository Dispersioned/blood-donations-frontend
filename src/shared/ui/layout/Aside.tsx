import { Button, styled } from '@mui/material';
import React from 'react';
import { ROUTES } from 'shared/config/routes';

const AsideLayout = styled('aside')`
  display: flex;
  justify-content: center;
  padding: 30px 15px;
  background-color: #e9e9e9;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.15);
`;

export function Aside() {
  const links = [{ label: 'Главная', url: ROUTES.home }];

  return (
    <AsideLayout>
      <nav>
        <ul style={{ listStyleType: 'none' }}>
          {links.map((link) => (
            <li key={link.url}>
              <Button>{link.label}</Button>
            </li>
          ))}
          <li>
            <Button>Выйти</Button>
          </li>
        </ul>
      </nav>
    </AsideLayout>
  );
}
