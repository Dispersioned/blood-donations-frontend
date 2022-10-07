import { Button } from '@mui/material';
import { IAuthPayload } from 'pages/auth/model';
import React from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

type RegisterActionBtnsProps = React.PropsWithChildren<{
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => IAuthPayload;
}>;

export function RegisterActionBtns({ handleSubmit, onSubmit }: RegisterActionBtnsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(ROUTES.login)}>Войти</Button>
      <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
        Зарегистрироваться
      </Button>
    </>
  );
}
