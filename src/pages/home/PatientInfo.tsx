import React, { useEffect } from 'react';

import { patientInfoModel } from '.';

type PatientInfoProps = {
  patientId: number;
};

export function PatientInfo({ patientId }: PatientInfoProps) {
  useEffect(() => {
    patientInfoModel.fetch({ patientId });
  }, [patientId]);

  return <div>PatientInfo</div>;
}
