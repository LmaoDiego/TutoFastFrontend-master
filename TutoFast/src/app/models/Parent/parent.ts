import {User} from '../User/user';

export class Parent extends User{
  availableHours: number;
}

export class ParentResponse {
  content: Parent[];
  totalElements: number;
}
