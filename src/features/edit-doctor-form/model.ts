import { doctorsModel } from 'entities/doctors';
import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { updateDoctor } from 'shared/api';
import { IUpdateDoctorDto } from 'shared/types';

class EditDoctorModel {
  constructor() {
    makeAutoObservable(this);
  }

  async update(data: IUpdateDoctorDto) {
    await updateDoctor(data);
    await doctorsModel.fetch();
    messagerModel.success('Данные доктора изменены');
  }
}

export const editDoctorModel = new EditDoctorModel();
