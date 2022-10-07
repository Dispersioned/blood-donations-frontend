import { Typography, styled } from '@mui/material';
import { auth } from 'pages/auth/model';
import { useForm } from 'react-hook-form';

import { LoginActionBtns } from './LoginActionBtns';
import { LoginFields } from './LoginFields';
import { RegisterActionBtns } from './RegisterActionBtns';
import { RegisterFields } from './RegisterFields';

type AuthFormProps = {
  type: 'login' | 'register';
};

export const FormLayout = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 350px;
`;

export const ActionBtns = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function AuthForm({ type }: AuthFormProps) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => auth({ type, data });

  return (
    <FormLayout>
      <Typography variant="h2" align="center">
        Банк крови
      </Typography>
      {type === 'login' && <LoginFields control={control} />}
      {type === 'register' && <RegisterFields control={control} />}

      <ActionBtns>
        {type === 'login' && <LoginActionBtns handleSubmit={handleSubmit} onSubmit={onSubmit} />}
        {type === 'register' && <RegisterActionBtns handleSubmit={handleSubmit} onSubmit={onSubmit} />}
      </ActionBtns>
    </FormLayout>
  );
}
