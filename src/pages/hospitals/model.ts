import { makeAutoObservable } from 'mobx';
import { fetchAllHospitals } from 'shared/api';
import { IHospital } from 'shared/types';

class HospitalsModel {
  constructor() {
    makeAutoObservable(this);
  }

  hospitals: IHospital[] = [];

  async fetch() {
    const hospitals = await fetchAllHospitals();
    if (hospitals) {
      this.hospitals = hospitals;
    }
  }
}

export const hospitalsModel = new HospitalsModel();
