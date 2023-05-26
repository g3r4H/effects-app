export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class User {
  constructor(public data: IUser) {}
}
