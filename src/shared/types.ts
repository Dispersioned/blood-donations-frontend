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

export type IHospital = Timestamp & {
  id: number;
  name: string;
  location: string;
};
export interface ICreateBloodDto {
  readonly group: IBloodGroup;
  readonly rhFactor: IBloodRhFactor;
}

export interface ILoginUserDto {
  readonly username: string;
  readonly password: string;
}

export interface IRegisterUserDto extends ILoginUserDto {
  readonly blood: ICreateBloodDto;
}
