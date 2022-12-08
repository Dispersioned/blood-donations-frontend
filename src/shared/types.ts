export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type IBloodGroup = '' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';
export type IRequestStatus = 'FULFILLED' | 'PENDING';

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

interface Id {
  id: number;
}

//* DTOs

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

export interface IRegisterPatientDto extends IRegisterUserDto {
  hospitalId: number;
  doctorId: number;
}

export interface ICreateDonationDto {
  userId: number;
  hospitalId: number;
  volume: number;
}

export interface ICreateRequestDto {
  patientId: number;
  volume: number;
}

export interface IConfirmRequestDto {
  requestId: number;
}

//* types

export type IHospitalBlood = Timestamp &
  Id & {
    hospital: IHospital;
  };

export type IDonation = Timestamp &
  Id & {
    volume: number;
    hospitalBlood: IHospitalBlood;
  };

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

export type IPatient = Timestamp &
  Id & {
    user: IUser;
    hospital: IHospital;
    doctor: IUser;
  };

export type IRequest = Timestamp &
  Id & {
    patient: IPatient;
    status: IRequestStatus;
    volume: number;
  };

export type IRequestWithInfo = {
  request: IRequest;
  availableVolume: number;
};

export type ICreateHospitalDto = {
  name: string;
  location: string;
};

export type IUpdateHospitalDto = {
  hospitalId: number;
  name: string;
  location: string;
};

//* events

export type IRegisterEvent = {
  username: string;
  password: string;
  repeat_password: string;
  blood: string;
};

export interface IRegisterPatientEvent extends IRegisterEvent {
  hospital: IHospital;
  doctor: IUser;
}
