import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Input } from 'shared/ui/input';

type RegisterFieldsProps = React.PropsWithChildren<{
  control: Control<FieldValues, any>;
}>;

export function RegisterFields({ control }: RegisterFieldsProps) {
  return (
    <>
      <Input label="Логин" name="username" control={control} rules={{ required: true }} autoFocus />
      <Input label="Пароль" name="password" control={control} rules={{ required: true }} />
      <Input
        defaultValue=""
        label="Повторите пароль"
        name="repeat_password"
        control={control}
        rules={{ required: true }}
      />
      <Controller
        defaultValue=""
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
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </>
  );
}
