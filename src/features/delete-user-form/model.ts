import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
import { makeAutoObservable } from 'mobx';
import { deleteDoctor as deleteDoctorApi, deletePatient as deletePatientApi } from 'shared/api';
import { IDeleteUserDto } from 'shared/types';

class DeleteUserModel {
  constructor() {
    makeAutoObservable(this);
  }

  async deletePatient(data: IDeleteUserDto) {
    const result = await deletePatientApi(data);
    setTimeout(async () => {
      await patientsModel.fetch();
      messagerModel.success('Пациент удален');
    }, 100);
  }

  async deleteDoctor(data: IDeleteUserDto) {
    const result = await deleteDoctorApi(data);
    await doctorsModel.fetch();
    messagerModel.success('Доктор удален');
  }
}

export const deleteUserModel = new DeleteUserModel();
