import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { makeDonation } from 'shared/api';
import { ICreateDonationDto } from 'shared/types';

class DonateBloodModel {
  constructor() {
    makeAutoObservable(this);
  }

  async donate(data: ICreateDonationDto) {
    await makeDonation(data);
    messagerModel.success('Кровь сдана');
  }
}

export const donateBloodModel = new DonateBloodModel();
