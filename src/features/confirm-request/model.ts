import { messagerModel } from 'entities/messager';
import { requestsModel } from 'entities/requests';
import { makeAutoObservable } from 'mobx';
import { confirmRequest } from 'shared/api';
import { IConfirmRequestDto } from 'shared/types';

class ConfirmRequestModel {
  constructor() {
    makeAutoObservable(this);
  }

  async confirm(data: IConfirmRequestDto) {
    await confirmRequest(data);
    await requestsModel.fetch();
    messagerModel.success('Запрос подтвержден');
  }
}

export const confirmRequestModel = new ConfirmRequestModel();
