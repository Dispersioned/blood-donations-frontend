import { Card, CardContent as MUICardContent, Typography, styled } from '@mui/material';
import { viewerModel } from 'entities/viewer';
import { DeleteHospitalForm } from 'features/delete-hospital-form';
import { DonateBloodForm } from 'features/donate-blood-form';
import { UpdateHospitalForm } from 'features/update-hospital-form';
import { observer } from 'mobx-react-lite';
import { isAdmin } from 'shared/lib/access/isAdmin';
import { IHospital } from 'shared/types';

const CardContent = styled(MUICardContent)`
  display: flex;
  justify-content: space-between;
`;

type HospitalCardProps = {
  hospital: IHospital;
};

function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card>
      <CardContent>
        <div>
          <Typography variant="h5">{hospital.name}</Typography>
          <Typography color="gray">{hospital.location}</Typography>
        </div>
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
          <DonateBloodForm hospitalId={hospital.id} />
          {viewerModel.user && isAdmin(viewerModel.user.role.value) && (
            <div style={{ display: 'flex' }}>
              <UpdateHospitalForm hospital={hospital} />
              <DeleteHospitalForm hospitalId={hospital.id} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default observer(HospitalCard);
