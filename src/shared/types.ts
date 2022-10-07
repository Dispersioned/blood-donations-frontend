export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type IBloodGroup = '' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';

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
  };
  blood: {
    id: number;
    group: IBloodGroup;
    rhFactor: IBloodRhFactor;
  };
};

export type AuthDto = {
  readonly login: string;
  readonly password: string;
};
