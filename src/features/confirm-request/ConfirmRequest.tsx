import { Button, Tooltip } from '@mui/material';
import { requestsModel } from 'entities/requests';
import { observer } from 'mobx-react-lite';

type ConfirmRequestProps = {
  requestId: number;
};

function ConfirmRequest({ requestId }: ConfirmRequestProps) {
  return (
    <Button variant="contained" onClick={() => requestsModel.confirm({ requestId })}>
      <Tooltip title="Назначенный больной получит кровь">
        <span>Утвердить</span>
      </Tooltip>
    </Button>
  );
}

export default observer(ConfirmRequest);
