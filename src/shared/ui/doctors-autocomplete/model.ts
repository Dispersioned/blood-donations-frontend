import { makeAutoObservable } from 'mobx';
import { fetchDoctors } from 'shared/api';
import { IUser } from 'shared/types';

class DoctorsAutocompleteModel {
  constructor() {
    makeAutoObservable(this);
  }

  doctors: IUser[] = [];

  async fetch() {
    const doctors = await fetchDoctors();
    if (doctors) {
      this.doctors = doctors;
    }
  }
}

export const doctorsAutocompleteModel = new DoctorsAutocompleteModel();
