import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type RegisterFieldsProps = React.PropsWithChildren<{
  control: Control<FieldValues, any>;
}>;

export function RegisterFields({ control }: RegisterFieldsProps) {
  return (
    <>
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
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Повторите пароль" />
        )}
        defaultValue=""
        name="repeat_password"
        control={control}
        rules={{ required: true }}
      />
    </>
  );
}
