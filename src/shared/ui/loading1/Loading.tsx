import { Typography, styled } from '@mui/material';
import React from 'react';

export const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export function Loading() {
  return (
    <Wrapper>
      <div>
        <Typography variant="h2">Loading. Please wait</Typography>
      </div>
    </Wrapper>
  );
}
