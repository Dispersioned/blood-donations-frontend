export type IBloodGroup = '' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';

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
