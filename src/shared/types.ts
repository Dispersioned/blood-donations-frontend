export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type IBloodGroup = '' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

export type IUser = Timestamp & {
  id: number;
  username: string;
  roleId: number;
  bloodId: number;
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

export type IHospital = Timestamp & {
  id: number;
  name: string;
  location: string;
};
