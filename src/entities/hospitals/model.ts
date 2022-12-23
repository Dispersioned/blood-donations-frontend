import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { createHospital, deleteHospital, fetchAllHospitals, updateHospital } from 'shared/api';
import { ICreateHospitalDto, IDeleteHospitalDto, IHospital, IUpdateHospitalDto } from 'shared/types';

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

  async create(data: ICreateHospitalDto) {
    await createHospital(data);
    await this.fetch();
    messagerModel.success('Больница создана');
  }

  async delete(data: IDeleteHospitalDto) {
    await deleteHospital(data);
    await this.fetch();
    messagerModel.success('Больница удалена');
  }

  async update(data: IUpdateHospitalDto) {
    const hospital = await updateHospital(data);
    await this.fetch();
    if (hospital) {
      messagerModel.success('Больница создана');
    }
  }
}

export const hospitalsModel = new HospitalsModel();
