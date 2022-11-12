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
  group: IBloodGroup;
  rhFactor: IBloodRhFactor;
}

export interface ILoginUserDto {
  username: string;
  password: string;
}

export interface IRegisterUserDto extends ILoginUserDto {
  blood: ICreateBloodDto;
}

export interface ICreateDonationDto {
  userId: number;
  hospitalId: number;
  volume: number;
}

export type IDonation = Timestamp & {
  id: number;
  userId: number;
  hospitalBloodId: number;
};
