import { Button } from '@mui/material';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

type LoginActionBtnsProps = {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => void;
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
