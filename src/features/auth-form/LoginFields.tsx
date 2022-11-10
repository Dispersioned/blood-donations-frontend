import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type LoginFieldsProps = {
  control: Control<FieldValues, any>;
};

export function LoginFields({ control }: LoginFieldsProps) {
  return (
    <>
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Логин" />
        )}
        defaultValue=""
        name="username"
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
    </>
  );
}
