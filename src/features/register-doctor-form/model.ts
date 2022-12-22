import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { registerDoctor } from 'shared/api';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { validatePassword } from 'shared/lib/validatePassword';
import { IRegisterEvent } from 'shared/types';

class RegisterDoctorModel {
  constructor() {
    makeAutoObservable(this);
  }

  async register(data: IRegisterEvent) {
    if (!validatePassword(data)) {
      messagerModel.error('Пароли не совпадают');
      return;
    }

    const doctor = await registerDoctor(registerFieldsMapper(data));
    if (doctor) {
      await doctorsModel.fetch();
      messagerModel.success('Доктор зарегистрирован');
    }
  }
}

export const registerDoctorModel = new RegisterDoctorModel();
