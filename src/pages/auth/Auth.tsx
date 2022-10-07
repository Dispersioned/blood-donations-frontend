import { Button, TextField, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { Layout } from 'shared/ui/layout';

import { auth } from './model';

export const AuthWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthForm = styled('form')`
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

type AuthProps = {
  type: 'login' | 'register';
};

export function Auth({ type }: AuthProps) {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => auth({ type, data });
  return (
    <Layout>
      <AuthWrapper>
        <AuthForm>
          <Typography variant="h2" align="center">
            Банк крови
          </Typography>
          <Controller
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Логин" />
            )}
            defaultValue=""
            name="login"
            control={control}
            rules={{ required: true }}
          />
          <Controller
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Пароль" />
            )}
            defaultValue=""
            name="password"
            control={control}
            rules={{ required: true }}
          />
          <ActionBtns>
            <Button onClick={() => navigate(ROUTES.register)}>Зарегистрироваться</Button>
            <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
              Войти
            </Button>
          </ActionBtns>
        </AuthForm>
      </AuthWrapper>
    </Layout>
  );
}
