import { Card, Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { requestsModel } from '.';

const List = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
`;

const RequestCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 15px;
`;

export function Requests() {
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
            <Typography>
              <span style={{ fontSize: 25 }}>
                {availableVolume} / {request.volume}
              </span>{' '}
              мл
            </Typography>
          </RequestCard>
        ))}
      </List>
    </Layout>
  );
}
