import { Control, FieldValues } from 'react-hook-form';
import { Input } from 'shared/ui/input';

type LoginFieldsProps = {
  control: Control<FieldValues, any>;
};

export function LoginFields({ control }: LoginFieldsProps) {
  return (
    <>
      <Input defaultValue="" label="Логин" name="username" control={control} rules={{ required: true }} autoFocus />
      <Input defaultValue="" label="Пароль" name="password" control={control} rules={{ required: true }} />
    </>
  );
}
