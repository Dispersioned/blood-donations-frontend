import React, { useEffect } from 'react';
import { Layout } from 'shared/ui/layout';

import { fetchHospitals } from './model';

export function Hospitals() {
  useEffect(() => {
    fetchHospitals();
  }, []);

  return <Layout>Hospitals</Layout>;
}
