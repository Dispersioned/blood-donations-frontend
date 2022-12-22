import { Autocomplete, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { IHospital } from 'shared/types';

import { hospitalsAutocompleteModel } from '.';

type HospitalsAutocompleteProps = {
  control: Control<FieldValues, any>;
  defaultValue?: IHospital;
};

function HospitalsAutocomplete({ control, defaultValue }: HospitalsAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) hospitalsAutocompleteModel.fetch();
  }, [isOpen]);

  return (
    <Controller
      defaultValue={defaultValue || null}
      name="hospital"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          options={hospitalsAutocompleteModel.hospitals}
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
              }}
            />
          )}
        />
      )}
    />
  );
}

export default observer(HospitalsAutocomplete);
