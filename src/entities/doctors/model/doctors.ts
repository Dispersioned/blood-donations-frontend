import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { fetchDoctors, registerDoctor, updateDoctor } from 'shared/api';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { validatePassword } from 'shared/lib/validatePassword';
import { IRegisterEvent, IUpdateDoctorDto, IUser } from 'shared/types';

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

  async register(data: IRegisterEvent) {
    if (!validatePassword(data)) {
      messagerModel.error('Пароли не совпадают');
      return;
    }

    const doctor = await registerDoctor(registerFieldsMapper(data));
    if (doctor) {
      await this.fetch();
      messagerModel.success('Доктор зарегистрирован');
    }
  }

  async update(data: IUpdateDoctorDto) {
    await updateDoctor(data);
    await this.fetch();
    messagerModel.success('Данные доктора изменены');
  }
}

export const doctorsModel = new DoctorsModel();
