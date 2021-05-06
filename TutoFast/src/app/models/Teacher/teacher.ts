import {User} from '../User/user';

export class Teacher extends User{
  clientXP: number;
  sessionXP: number;
  active: boolean;
}

export class TeacherResponse {
  content: Teacher[];
  totalElements: number;
}
