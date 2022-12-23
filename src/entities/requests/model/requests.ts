import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { confirmRequest, fetchAllRequests, makeDonationRequest } from 'shared/api';
import { IConfirmRequestDto, ICreateRequestDto, IRequestWithInfo } from 'shared/types';

class RequestsModel {
  constructor() {
    makeAutoObservable(this);
  }

  requests: IRequestWithInfo[] = [];

  async fetch() {
    const requests = await fetchAllRequests();
    if (requests) {
      this.requests = requests;
    }
  }

  async confirm(data: IConfirmRequestDto) {
    await confirmRequest(data);
    await this.fetch();
    messagerModel.success('Запрос подтвержден');
  }

  async makeRequest(data: ICreateRequestDto) {
    await makeDonationRequest(data);
    messagerModel.success('Запрос создан');
  }
}

export const requestsModel = new RequestsModel();
