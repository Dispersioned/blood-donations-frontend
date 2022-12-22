import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';

type Message = {
  type?: AlertColor;
  msg: string;
};

class MessagerModel {
  constructor() {
    makeAutoObservable(this);
  }

  msg = '';

  shown = false;

  type?: AlertColor;

  showMessage = async (msg: Message) => {
    this.shown = true;
    this.msg = msg.msg;
    this.type = msg.type;
    await new Promise((res) => {
      setTimeout(() => {
        this.shown = false;
        res(null);
      }, 5000);
    });
  };

  error = (msg: string) => {
    this.showMessage({ msg, type: 'error' });
  };

  success = (msg: string) => {
    this.showMessage({ msg, type: 'success' });
  };

  closeMessage = () => {
    this.shown = false;
  };
}

export const messagerModel = new MessagerModel();
