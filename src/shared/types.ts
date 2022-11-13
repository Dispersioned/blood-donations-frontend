export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type IBloodGroup = '' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

interface Id {
  id: number;
}

export interface ICreateBloodDto {
  group: IBloodGroup;
  rhFactor: IBloodRhFactor;
}

export type IBlood = ICreateBloodDto & Id;

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

export type IDonation = Timestamp & ICreateDonationDto & Id;

export type IUser = Timestamp &
  Id & {
    username: string;
    roleId: number;
    bloodId: number;
    role: {
      id: number;
      value: IRoleName;
    };
    blood: IBlood;
    donations: IDonation[];
  };

export type IHospital = Timestamp &
  Id & {
    name: string;
    location: string;
  };
