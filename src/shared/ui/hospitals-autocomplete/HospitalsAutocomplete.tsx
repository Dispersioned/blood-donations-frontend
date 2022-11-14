import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { hospitalsAutocompleteModel } from '.';

type HospitalsAutocompleteProps = {
  control: Control<FieldValues, any>;
};

export function HospitalsAutocomplete({ control }: HospitalsAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hospitals = useUnit(hospitalsAutocompleteModel.$hospitals);
  const fetched = useUnit(hospitalsAutocompleteModel.$fetched);
  const loading = isOpen && !fetched;

  useEffect(() => {
    if (loading) hospitalsAutocompleteModel.fetch();
  }, [loading]);

  return (
    <Controller
      defaultValue={null}
      name="hospital"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          options={hospitals}
          getOptionLabel={(option) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.name === value.name;
          }}
          onChange={(e, value) => {
            field.onChange(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Больница"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
