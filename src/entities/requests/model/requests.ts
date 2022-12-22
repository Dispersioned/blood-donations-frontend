import { makeAutoObservable } from 'mobx';
import { fetchAllRequests } from 'shared/api';
import { IRequestWithInfo } from 'shared/types';

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
}

export const requestsModel = new RequestsModel();
