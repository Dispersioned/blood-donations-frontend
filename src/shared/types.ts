export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type IUser = {
  id: number;
  username: string;
  roleId: number;
  bloodId: number;
  createdAt: Date;
  updatedAt: Date;
  role: {
    id: number;
    value: IRoleName;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type AuthDto = {
  readonly login: string;
  readonly password: string;
};
