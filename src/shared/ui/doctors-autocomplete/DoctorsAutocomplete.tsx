import { Autocomplete, TextField } from '@mui/material';
import { doctorsModel } from 'entities/doctors';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { IUser } from 'shared/types';

type DoctorsAutocompleteProps = {
  control: Control<FieldValues, any>;
  defaultValue?: IUser;
};

function DoctorsAutocomplete({ control, defaultValue }: DoctorsAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) doctorsModel.fetch();
  }, [isOpen]);

  return (
    <Controller
      defaultValue={defaultValue || null}
      name="doctor"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          options={doctorsModel.doctors}
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

export default observer(DoctorsAutocomplete);
