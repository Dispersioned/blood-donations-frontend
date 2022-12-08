import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { useState } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';

import { deleteHospitalModel } from '.';

type DonateBloodFormProps = {
  hospitalId: number;
};

export function DeleteHospitalForm({ hospitalId }: DonateBloodFormProps) {
  const user = useUnit($user);
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setIsShown(true)} disabled={!isAdmin(user.role.value)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Удалить больницуц</DialogTitle>
        <DialogContent>
          <DialogContentText>Внимание: это действие необратимо</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteHospitalModel.update({ hospitalId })} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
