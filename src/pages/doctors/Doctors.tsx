import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { doctorsModel } from '.';

export function Doctors() {
  useEffect(() => {
    doctorsModel.fetch();
  }, []);

  const doctors = useUnit(doctorsModel.$doctors);

  return (
    <Layout title="Доктора">
      <div>
        {doctors.map((doctor, i) => (
          <Typography key={doctor.id} fontSize={22}>
            {i + 1}. {doctor.username}
          </Typography>
        ))}
      </div>
    </Layout>
  );
}
