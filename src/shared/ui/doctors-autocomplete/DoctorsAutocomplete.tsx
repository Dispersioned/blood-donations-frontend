import { Autocomplete, TextField } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { doctorsAutocompleteModel } from '.';

type DoctorsAutocompleteProps = {
  control: Control<FieldValues, any>;
};

export function DoctorsAutocomplete({ control }: DoctorsAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const doctors = useUnit(doctorsAutocompleteModel.$doctors);

  useEffect(() => {
    if (isOpen) doctorsAutocompleteModel.fetch();
  }, [isOpen]);

  return (
    <Controller
      defaultValue={null}
      name="doctor"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          options={doctors}
          getOptionLabel={(option) => {
            return option.username;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.username === value.username;
          }}
          onChange={(e, value) => {
            field.onChange(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Лечащий доктор"
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      )}
    />
  );
}
