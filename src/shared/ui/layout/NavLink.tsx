import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

type onClickLink = {
  onClick: () => void;
  url?: never;
};

type UrlLink = {
  onClick?: never;
  url: string;
};

type NavLinkProps = React.PropsWithChildren & (onClickLink | UrlLink);

export function NavLink({ onClick, url, children }: NavLinkProps) {
  return (
    <li>
      <Button component={Link} to={url as string} onClick={onClick as () => void} style={{ width: '100%' }}>
        {children}
      </Button>
    </li>
  );
}
