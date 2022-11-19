import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPatient } from 'shared/types';
import { Input } from 'shared/ui/input';

import { makeRequestFormModel } from '.';

type MakeRequestFormProps = {
  patient: IPatient;
};

const Wrapper = styled('div')`
  margin: 10px 0;
`;

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`;

export function MakeRequestForm({ patient }: MakeRequestFormProps) {
  const [isShown, setIsShown] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setIsShown(false);
    makeRequestFormModel.donate({
      patientId: patient.id,
      volume: +data.volume,
    });
  };

  return (
    <Wrapper>
      <Button variant="contained" onClick={() => setIsShown(true)}>
        Запросить кровь
      </Button>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Запросить кровь</DialogTitle>
        <DialogContent>
          <DialogContentText>Укажите необходимый объем</DialogContentText>
          <Form id="make_request_form">
            <Input autoFocus control={control} label="Объем крови" name="volume" rules={{ required: true }} />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button form="make_request_form" type="submit" onClick={handleSubmit(onSubmit)}>
            Сдать
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}
