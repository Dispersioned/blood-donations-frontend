import { messagerModel } from 'entities/messager';
import { viewerModel } from 'entities/viewer';
import { makeAutoObservable } from 'mobx';
import { registerFieldsMapper } from 'shared/lib/registerFieldsMapper';
import { ILoginUserDto, IRegisterEvent } from 'shared/types';

class AuthModel {
  constructor() {
    makeAutoObservable(this);
  }

  async login(data: ILoginUserDto) {
    const user = await viewerModel.login(data);
    if (user) {
      messagerModel.success('Успешный вход в аккаунт');
      viewerModel.setupViewer(user);
    }
  }

  async register(data: IRegisterEvent) {
    const user = await viewerModel.register(registerFieldsMapper(data));
    if (user) {
      messagerModel.success('Вы успешно зарегистрировались');
      viewerModel.setupViewer(user);
    }
  }
}

export const authModel = new AuthModel();
