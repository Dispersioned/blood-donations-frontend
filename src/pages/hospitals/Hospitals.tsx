import { Typography, styled } from '@mui/material';
import { viewerModel } from 'entities/viewer';
import { CreateHospitalForm } from 'features/create-hospital-form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { Layout } from 'shared/ui/layout';

import HospitalCard from './HospitalCard';
import { hospitalsModel } from './model';

const HospitalsList = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

function Hospitals() {
  useEffect(() => {
    hospitalsModel.fetch();
  }, []);

  return (
    <Layout title="Больницы">
      {viewerModel.user && isAdmin(viewerModel.user.role.value) && <CreateHospitalForm />}
      <HospitalsList>
        {hospitalsModel.hospitals && hospitalsModel.hospitals.length > 0 ? (
          hospitalsModel.hospitals.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)
        ) : (
          <Typography>Больниц еще нет</Typography>
        )}
      </HospitalsList>
    </Layout>
  );
}

export default observer(Hospitals);
