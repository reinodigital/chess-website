export interface ICountAndListUsers {
  total: number;
  page: number;
  users: IAuth[];
}

export interface IAuthResponse {
  user: IAuth;
  token: string;
}
export interface IAuth {
  uid: number;
  name: string;
  username: string;
  country: string;
  birthday: Date | null;
  roles: string[];
  isActive: boolean;
  points: number;
  age?: number;
  gender: string;
  token: string;
}

export interface IAuthToLogin {
  username: string;
  password: string;
}

export interface IAuthToRegister {
  name: string;
  username: string;
  password: string;
  // roles: string[];
}

export interface IAuthToUpdate {
  name: string;
  username: string;
  password: string;
  // roles: string[];
}

export interface IAuthAndCount {
  count: number;
  users: IAuth[];
}
