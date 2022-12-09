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
import { IDeleteUserDto } from 'shared/types';

type DeleteUserFormProps = {
  userId: number;
  handler: (payload: IDeleteUserDto) => IDeleteUserDto;
};

export function DeleteUserForm({ userId, handler }: DeleteUserFormProps) {
  const user = useUnit($user);
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      {isAdmin(user.role.value) && (
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
          <Button onClick={() => handler({ userId })} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
