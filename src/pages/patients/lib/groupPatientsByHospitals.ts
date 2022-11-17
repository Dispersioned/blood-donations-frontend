import { IHospital, IPatient } from 'shared/types';

type IDataItem = {
  hospital: IHospital;
  patients: IPatient[];
};

export function groupPatientsByHospitals(patients: IPatient[]) {
  const data: Record<IHospital['id'], IDataItem> = {};

  for (const patient of patients) {
    if (!data[patient.hospital.id]) {
      data[patient.hospital.id] = {
        hospital: patient.hospital,
        patients: [],
      };
    }
    data[patient.hospital.id].patients.push(patient);
  }

  return Object.entries(data);
}
