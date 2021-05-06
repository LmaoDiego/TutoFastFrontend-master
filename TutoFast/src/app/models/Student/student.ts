import {User} from '../User/user';
import {SchoolLevel} from '../SchoolLevel/school-level';
import {SchoolGrade} from '../SchoolGrade/school-grade';

export class Student extends User{
  age: number;
  schoolLevel: SchoolLevel;
  schoolGrade: SchoolGrade;
}

export class StudentResponse {
  content: Student[];
  totalElements: number;
}
