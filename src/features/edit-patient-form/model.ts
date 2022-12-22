import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
import { makeAutoObservable } from 'mobx';
import { updatePatient } from 'shared/api';
import { IUpdatePatientDto } from 'shared/types';

class UpdatePatientModel {
  constructor() {
    makeAutoObservable(this);
  }

  async update(data: IUpdatePatientDto) {
    await updatePatient(data);
    await patientsModel.fetch();
    messagerModel.success('Данные пациента изменены');
  }
}

export const updatePatientModel = new UpdatePatientModel();
