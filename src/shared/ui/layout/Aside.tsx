import { styled } from '@mui/material';
import { exit } from 'entities/viewer';
import { ROUTES } from 'shared/config/routes';

import { NavLink } from './NavLink';

const AsideLayout = styled('aside')`
  display: flex;
  justify-content: center;
  padding: 30px 15px;
  background-color: #e9e9e9;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.15);
`;

export function Aside() {
  const links = [{ label: 'Профиль', url: ROUTES.home }];

  return (
    <AsideLayout>
      <nav>
        <ul style={{ listStyleType: 'none', width: 200, display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => (
            <NavLink key={link.url}>{link.label}</NavLink>
          ))}
          <NavLink onClick={() => exit()}>Выйти</NavLink>
        </ul>
      </nav>
    </AsideLayout>
  );
}
