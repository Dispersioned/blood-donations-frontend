import { messagerModel } from 'entities/messager';
import { patientsModel } from 'entities/patients';
import { makeAutoObservable } from 'mobx';
import { registerPatient } from 'shared/api';
import { bloodMapper } from 'shared/lib/bloodMapper';
import { validatePassword } from 'shared/lib/validatePassword';
import { IRegisterPatientEvent } from 'shared/types';

class RegisterPatientModel {
  constructor() {
    makeAutoObservable(this);
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
      await patientsModel.fetch();
      messagerModel.success('Пациент зарегистрирован');
    }
  }
}

export const registerPatientModel = new RegisterPatientModel();
