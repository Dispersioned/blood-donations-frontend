import { Typography, styled } from '@mui/material';
import { authModel } from 'pages/auth';
import { useForm } from 'react-hook-form';
import { FormLayout } from 'shared/ui/form-layout';
import { RegisterFields } from 'shared/ui/register-fields';

import { LoginActionBtns } from './LoginActionBtns';
import { LoginFields } from './LoginFields';
import { RegisterActionBtns } from './RegisterActionBtns';

type AuthFormProps = {
  type: 'login' | 'register';
};

export const ActionBtns = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function AuthForm({ type }: AuthFormProps) {
  const { control, handleSubmit } = useForm();
  const onLogin = (data: any) => authModel.login(data);
  const onRegister = (data: any) => authModel.register(data);

  return (
    <FormLayout>
      <Typography variant="h2" align="center">
        Банк крови
      </Typography>
      {type === 'login' && <LoginFields control={control} />}
      {type === 'register' && <RegisterFields control={control} />}

      <ActionBtns>
        {type === 'login' && <LoginActionBtns handleSubmit={handleSubmit} onSubmit={onLogin} />}
        {type === 'register' && <RegisterActionBtns handleSubmit={handleSubmit} onSubmit={onRegister} />}
      </ActionBtns>
    </FormLayout>
  );
}
