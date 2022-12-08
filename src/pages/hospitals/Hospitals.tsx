import { Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { $user } from 'entities/viewer/model';
import { CreateHospitalForm } from 'features/create-hospital-form';
import { useEffect } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { Layout } from 'shared/ui/layout';

import { HospitalCard } from './HospitalCard';
import { $hospitals, fetch } from './model';

const HospitalsList = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

export function Hospitals() {
  useEffect(() => {
    fetch();
  }, []);

  const user = useUnit($user);
  const hospitals = useUnit($hospitals);

  return (
    <Layout title="Больницы">
      {isAdmin(user.role.value) && <CreateHospitalForm />}
      <HospitalsList>
        {hospitals && hospitals.length > 0 ? (
          hospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)
        ) : (
          <Typography>Больниц еще нет</Typography>
        )}
      </HospitalsList>
    </Layout>
  );
}
