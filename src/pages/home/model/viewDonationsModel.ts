import { makeAutoObservable } from 'mobx';
import { fetchUserDonations } from 'shared/api';
import { IDonation } from 'shared/types';

type IFetchPayload = {
  userId: number;
};

class ViewDonationsModel {
  constructor() {
    makeAutoObservable(this);
  }

  donations: IDonation[] = [];

  async fetch({ userId }: IFetchPayload) {
    const donations = await fetchUserDonations(userId);
    if (donations) {
      this.donations = donations;
    }
  }
}

export const viewDonationsModel = new ViewDonationsModel();
