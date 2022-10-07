import { styled } from '@mui/material';
import { AuthForm } from 'features/auth-form';
import { Layout } from 'shared/ui/layout';

export const AuthWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type AuthProps = {
  type: 'login' | 'register';
};

export function Auth({ type }: AuthProps) {
  return (
    <Layout>
      <AuthWrapper>
        <AuthForm type={type} />
      </AuthWrapper>
    </Layout>
  );
}
