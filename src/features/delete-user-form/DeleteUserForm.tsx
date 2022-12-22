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
import { viewerModel } from 'entities/viewer';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { IDeleteUserDto } from 'shared/types';

type DeleteUserFormProps = {
  userId: number;
  handler: (payload: IDeleteUserDto) => void;
};

function DeleteUserForm({ userId, handler }: DeleteUserFormProps) {
  const [isShown, setIsShown] = useState(false);

  const onDelete = async () => {
    await handler({ userId });
    setIsShown(false);
  };

  return (
    <div>
      {viewerModel.user && isAdmin(viewerModel.user.role.value) && (
        <IconButton onClick={() => setIsShown(true)}>
          <DeleteIcon />
        </IconButton>
      )}
      <Dialog open={isShown} onClose={() => setIsShown(false)}>
        <DialogTitle>Удалить пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>Внимание: это действие необратимо</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(DeleteUserForm);
