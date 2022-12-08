import { Card, Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { useEffect } from 'react';
import { formatDate } from 'shared/lib/formatDate';

import { viewDonationsModel } from '.';

const Wrapper = styled('div')`
  display: flex;
  margin-top: 15px;
  gap: 15px;
  flex-direction: column;
`;

const List = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
`;

const DonationCard = styled(Card)`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 30px;
  padding: 10px 15px;
`;

export function ViewDonations() {
  const user = useUnit($user);
  const donations = useUnit(viewDonationsModel.$donations);

  useEffect(() => {
    viewDonationsModel.fetch({ userId: user.id });
  }, [user]);

  return (
    <Wrapper>
      <Typography variant="h4">Сданная кровь</Typography>
      {donations.length > 0 ? (
        <List>
          {donations.map((donation) => (
            <DonationCard key={donation.id}>
              <div>
                <Typography variant="h6">{donation.hospitalBlood.hospital.name}</Typography>
                <Typography>{formatDate(donation.createdAt)}</Typography>
              </div>
              <Typography>
                <span style={{ fontSize: '1.7em' }}>{donation.volume}</span> мл
              </Typography>
            </DonationCard>
          ))}
        </List>
      ) : (
        <Typography>Вы не сдавали кровь</Typography>
      )}
    </Wrapper>
  );
}
