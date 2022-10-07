import { Container } from '@mui/material';
import React from 'react';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="xl" style={{ minHeight: '100vh' }}>
      {children}
    </Container>
  );
}
