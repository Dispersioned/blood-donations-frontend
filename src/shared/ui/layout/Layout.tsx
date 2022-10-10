import { Container, styled } from '@mui/material';
import { Message } from 'entities/messager';
import React from 'react';

import { Aside } from './Aside';

type LayoutProps = React.PropsWithChildren;

export const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

export function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <Aside />
      <Container maxWidth="xl" component="main" style={{ marginTop: 20 }}>
        {children}
      </Container>
      <Message />
    </Wrapper>
  );
}
