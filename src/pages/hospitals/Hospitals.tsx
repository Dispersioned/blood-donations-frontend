import { styled } from '@mui/material';
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
`;

export function Hospitals() {
  useEffect(() => {
    fetch();
  }, []);

  const user = useUnit($user);
  const hospitals = useUnit($hospitals);

  return (
    <Layout title="Больницы">
      <HospitalsList>
        {isAdmin(user.role.value) && <CreateHospitalForm />}
        {hospitals && hospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}
      </HospitalsList>
    </Layout>
  );
}
