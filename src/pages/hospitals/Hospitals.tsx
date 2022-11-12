import { styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { HospitalCard } from './HospitalCard';
import { $hospitals, fetchHospitals } from './model';

const HospitalsList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export function Hospitals() {
  useEffect(() => {
    fetchHospitals();
  }, []);

  const hospitals = useUnit($hospitals);

  return (
    <Layout title="Больницы">
      <HospitalsList>
        {hospitals && hospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}
      </HospitalsList>
    </Layout>
  );
}
