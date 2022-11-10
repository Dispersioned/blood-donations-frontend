import { Button } from '@mui/material';
import React from 'react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { ILoginUserDto } from 'shared/types';

type LoginActionBtnsProps = {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => ILoginUserDto;
};

export function LoginActionBtns({ handleSubmit, onSubmit }: LoginActionBtnsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(ROUTES.register)}>Зарегистрироваться</Button>
      <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
        Войти
      </Button>
    </>
  );
}
