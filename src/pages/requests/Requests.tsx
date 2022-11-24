import { Card, Chip, Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { requestsModel } from 'entities/requests';
import { $user } from 'entities/viewer/model';
import { ConfirmRequest } from 'features/confirm-request';
import { useEffect } from 'react';
import { canConfirmRequest } from 'shared/lib/access/canConfirmDonation';
import { Layout } from 'shared/ui/layout';

const List = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 15px;
`;

const RequestCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 15px;
`;

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export function Requests() {
  const user = useUnit($user);
  useEffect(() => {
    requestsModel.fetch();
  }, []);

  const requests = useUnit(requestsModel.$requests);

  return (
    <Layout title="Запросы крови">
      <List>
        {requests.map(({ request, availableVolume }) => (
          <RequestCard key={request.id}>
            <Typography>Пациент: {request.patient.user.username}</Typography>
            <Typography>Лечащий доктор: {request.patient.doctor.username}</Typography>
            <Typography>Больница: {request.patient.hospital.name}</Typography>
            <Typography>
              Кровь:{' '}
              <b>
                {request.patient.user.blood.group}
                {request.patient.user.blood.rhFactor}
              </b>
            </Typography>
            <Flex>
              <Typography>
                <span style={{ fontSize: 25 }}>
                  {availableVolume} / {request.volume}
                </span>{' '}
                мл
              </Typography>
              {request.status === 'FULFILLED' ? (
                <Chip color="success" label="Выполнен" style={{ width: 115, height: 35, fontSize: 16 }} />
              ) : (
                canConfirmRequest(user.role.value) && <ConfirmRequest requestId={request.id} />
              )}
            </Flex>
          </RequestCard>
        ))}
      </List>
    </Layout>
  );
}
