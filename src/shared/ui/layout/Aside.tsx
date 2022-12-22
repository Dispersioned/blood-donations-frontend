import { styled } from '@mui/material';
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { LINKS } from 'shared/config/routes';

import { NavLink } from './NavLink';

const AsideLayout = styled('aside')`
  display: flex;
  justify-content: center;
  padding: 30px 15px;
  background-color: #e9e9e9;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.15);
`;

function Aside() {
  return (
    <AsideLayout>
      <nav>
        <ul style={{ listStyleType: 'none', width: 200, display: 'flex', flexDirection: 'column' }}>
          {LINKS.filter(
            (link) =>
              !link.access || (viewerModel.user && link.access && link.access.includes(viewerModel.user.role.value))
          ).map((link) => (
            <NavLink key={link.url} url={link.url}>
              {link.label}
            </NavLink>
          ))}
          <NavLink onClick={() => viewerModel.exit()}>Выйти</NavLink>
        </ul>
      </nav>
    </AsideLayout>
  );
}

export default observer(Aside);
