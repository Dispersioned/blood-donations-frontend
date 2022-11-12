import { TextField } from '@mui/material';
import { Controller, UseControllerProps } from 'react-hook-form';

type InputProps = {
  control: UseControllerProps['control'];
  label: string;
  name: string;
  defaultValue?: string;
  rules?: UseControllerProps['rules'];
  autoFocus?: boolean;
};

export function Input({ control, label, name, defaultValue = '', rules, autoFocus }: InputProps) {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          label={label}
        />
      )}
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
    />
  );
}
