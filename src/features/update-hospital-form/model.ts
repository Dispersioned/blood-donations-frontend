import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { hospitalsModel } from 'pages/hospitals';
import { updateHospital } from 'shared/api';
import { IUpdateHospitalDto } from 'shared/types';

class UpdateHospitalModel {
  constructor() {
    makeAutoObservable(this);
  }

  async update(data: IUpdateHospitalDto) {
    const hospital = await updateHospital(data);
    await hospitalsModel.fetch();
    if (hospital) {
      messagerModel.success('Больница создана');
    }
  }
}

export const updateHospitalModel = new UpdateHospitalModel();
