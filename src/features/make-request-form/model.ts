import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { makeDonationRequest } from 'shared/api';
import { ICreateRequestDto } from 'shared/types';

class MakeRequestModel {
  constructor() {
    makeAutoObservable(this);
  }

  async donate(data: ICreateRequestDto) {
    await makeDonationRequest(data);
    messagerModel.success('Запрос создан');
  }
}

export const makeRequestModel = new MakeRequestModel();
