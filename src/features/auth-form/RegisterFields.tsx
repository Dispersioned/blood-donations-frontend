import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type RegisterFieldsProps = React.PropsWithChildren<{
  control: Control<FieldValues, any>;
}>;

export function RegisterFields({ control }: RegisterFieldsProps) {
  return (
    <>
      <Controller
        defaultValue=""
        name="login"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Логин" />
        )}
      />
      <Controller
        defaultValue=""
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Пароль" />
        )}
      />
      <Controller
        defaultValue=""
        name="repeat_password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField value={value} onChange={onChange} onBlur={onBlur} inputRef={ref} label="Повторите пароль" />
        )}
      />
      <Controller
        name="blood"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="blood_select_label">Группа крови</InputLabel>
            <Select {...field} labelId="blood_select_label" label="Группа крови">
              <MenuItem value="0+">0+</MenuItem>
              <MenuItem value="0-">0-</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </>
  );
}
