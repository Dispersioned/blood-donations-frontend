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
import { hospitalsModel } from 'entities/hospitals';
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';

type DeleteHospitalFormProps = {
  hospitalId: number;
};

function DeleteHospitalForm({ hospitalId }: DeleteHospitalFormProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <IconButton
        onClick={() => setIsShown(true)}
        disabled={!!viewerModel.user && !isAdmin(viewerModel.user.role.value)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Удалить больницу</DialogTitle>
        <DialogContent>
          <DialogContentText>Внимание: это действие необратимо</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => hospitalsModel.delete({ hospitalId })} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(DeleteHospitalForm);
