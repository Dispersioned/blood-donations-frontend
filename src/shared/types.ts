export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type IUser = {
  id: number;
  username: string;
  roleId: number;
  bloodId: number;
  role: {
    id: number;
    value: IRoleName;
  };
};

export type AuthDto = {
  readonly login: string;
  readonly password: string;
};
