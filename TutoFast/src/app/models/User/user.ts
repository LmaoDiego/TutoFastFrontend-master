import {Account} from '../Account/account';
import {Category} from '../Category/category';
import {District} from '../District/district';
import {Filee} from '../Filee/filee';

export class User extends Account{
  name: string;
  lastname: string;
  dni: string;
  birthday: Date;
  email: string;
  phone: string;
  adress: string;
  photo: Filee;
  category: Category;
  district: District;
}

export class UserResponse{
  content: User[];
  totalElements: number;
}
