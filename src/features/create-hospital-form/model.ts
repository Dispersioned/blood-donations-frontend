import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { hospitalsModel } from 'pages/hospitals';
import { createHospital } from 'shared/api';
import { ICreateHospitalDto } from 'shared/types';

class CreateHospitalModel {
  constructor() {
    makeAutoObservable(this);
  }

  async create(data: ICreateHospitalDto) {
    await createHospital(data);
    await hospitalsModel.fetch();
    messagerModel.success('Больница создана');
  }
}

export const createHospitalModel = new CreateHospitalModel();
