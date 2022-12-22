import { makeAutoObservable } from 'mobx';
import { fetchPatientInfo } from 'shared/api';
import { IPatient } from 'shared/types';

type IFetchPayload = {
  patientId: number;
};

class PatientInfoModel {
  constructor() {
    makeAutoObservable(this);
  }

  patient: IPatient | null = null;

  async fetch({ patientId }: IFetchPayload) {
    const patientInfo = await fetchPatientInfo(patientId);
    this.patient = patientInfo;
  }
}

export const patientInfoModel = new PatientInfoModel();
