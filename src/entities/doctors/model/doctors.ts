import { makeAutoObservable } from 'mobx';
import { fetchDoctors } from 'shared/api';
import { IUser } from 'shared/types';

class DoctorsModel {
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

export const doctorsModel = new DoctorsModel();
