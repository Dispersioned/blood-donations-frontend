import { Container, Typography, styled } from '@mui/material';
import { Message } from 'entities/messager';
import React from 'react';

import { Aside } from './Aside';

type LayoutProps = React.PropsWithChildren<{
  title?: string;
}>;

export const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

export function Layout({ children, title }: LayoutProps) {
  return (
    <Wrapper>
      <Aside />
      <Container maxWidth="xl" component="main" style={{ marginTop: 20 }}>
        {title && (
          <Typography variant="h3" style={{ marginBottom: 10 }}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
      <Message />
    </Wrapper>
  );
}
