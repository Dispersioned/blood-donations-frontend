import { Card, CardContent, Typography, styled } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

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
        {hospitals &&
          hospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardContent>
                <Typography variant="h5">{hospital.name}</Typography>
                <Typography color="gray">{hospital.location}</Typography>
              </CardContent>
            </Card>
          ))}
      </HospitalsList>
    </Layout>
  );
}
