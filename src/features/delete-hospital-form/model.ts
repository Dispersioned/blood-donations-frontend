import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { hospitalsModel } from 'pages/hospitals';
import { deleteHospital } from 'shared/api';
import { IDeleteHospitalDto } from 'shared/types';

class DeleteHospitalModel {
  constructor() {
    makeAutoObservable(this);
  }

  async delete(data: IDeleteHospitalDto) {
    await deleteHospital(data);
    await hospitalsModel.fetch();
    messagerModel.success('Больница удалена');
  }
}

export const deleteHospitalModel = new DeleteHospitalModel();
