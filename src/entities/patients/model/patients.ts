import { makeAutoObservable } from 'mobx';
import { fetchAllPatients } from 'shared/api';
import { IPatient } from 'shared/types';

class PatientsModel {
  constructor() {
    makeAutoObservable(this);
  }

  patients: IPatient[] = [];

  async fetch() {
    const patients = await fetchAllPatients();
    if (patients) {
      this.patients = patients;
    }
  }
}

export const patientsModel = new PatientsModel();
