import { makeAutoObservable } from 'mobx';
import { fetchAllHospitals } from 'shared/api';
import { IHospital } from 'shared/types';

class HospitalsAutocompleteModel {
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

export const hospitalsAutocompleteModel = new HospitalsAutocompleteModel();
