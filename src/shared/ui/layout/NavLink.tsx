import { Button } from '@mui/material';
import React from 'react';

type NavLinkProps = React.PropsWithChildren<{
  onClick?: () => void;
}>;

export function NavLink({ children, onClick }: NavLinkProps) {
  return (
    <li>
      <Button onClick={onClick} style={{ width: '100%' }}>
        {children}
      </Button>
    </li>
  );
}
