import { messagerModel } from 'entities/messager';
import { makeAutoObservable } from 'mobx';
import { fetchMe, loginUser, registerUser } from 'shared/api';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { ILoginUserDto, IRegisterEvent, IRegisterUserDto, IUser } from 'shared/types';

class ViewerModel {
  constructor() {
    makeAutoObservable(this);
  }

  user: IUser | null = null;

  isFetched = false;

  login = async (data: ILoginUserDto) => {
    const res = await loginUser(data);
    if (res) {
      localStorage.setItem('token', res.token);
      this.setupViewer(res.user);
      messagerModel.success('Успешный вход в аккаунт');
    }
  };

  register = async (data: IRegisterEvent) => {
    const res = await registerUser(registerFieldsMapper(data));
    if (res) {
      localStorage.setItem('token', res.token);
      this.setupViewer(res.user);
      messagerModel.success('Вы успешно зарегистрировались');
    }
  };

  setupViewer = (user: IUser) => {
    this.user = user;
    this.isFetched = true;
  };

  checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isFetched = true;
      return;
    }

    const user = await this.validateToken(token);
    if (!user) {
      this.exit();
      this.isFetched = true;
      return;
    }
    this.setupViewer(user);
  };

  private validateToken = async (token: string) => {
    const res = await fetchMe(token);
    return res?.user;
  };

  exit = () => {
    this.user = null;
    localStorage.removeItem('token');
  };
}

export const viewerModel = new ViewerModel();
