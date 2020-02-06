import {Role} from './role.model';

export class User {
  id: string;
  password: string;
  username:string;
  role: Role;
  email: string;
}
