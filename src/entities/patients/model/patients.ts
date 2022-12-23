import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { fetchAllPatients, registerPatient, updatePatient } from 'shared/api';
import { bloodMapper } from 'shared/lib/bloodMapper';
import { validatePassword } from 'shared/lib/validatePassword';
import { IPatient, IRegisterPatientEvent, IUpdatePatientDto } from 'shared/types';

class PatientsModel {
  constructor() {
    makeAutoObservable(this);
  }

  patients: IPatient[] = [];

  async fetch() {
    const patients = await fetchAllPatients();
    if (patients) {
      this.patients = patients;
    }
  }

  async update(data: IUpdatePatientDto) {
    await updatePatient(data);
    await this.fetch();
    messagerModel.success('Данные пациента изменены');
  }

  async register(data: IRegisterPatientEvent) {
    if (!validatePassword(data)) {
      messagerModel.error('Пароли не совпадают');
      return;
    }

    const patient = await registerPatient({
      ...data,
      blood: bloodMapper(data.blood),
      hospitalId: data.hospital.id,
      doctorId: data.doctor.id,
    });
    if (patient) {
      await this.fetch();
      messagerModel.success('Пациент зарегистрирован');
    }
  }
}

export const patientsModel = new PatientsModel();
