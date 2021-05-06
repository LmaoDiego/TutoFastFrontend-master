import {Subject} from "../Subject/subject";
import {Student} from "../Student/student";
import {Teacher} from "../Teacher/teacher";

export class Session {
  id: number;
  name: string;
  startAt:  Date;
  endAt:Date;

  subject: (Subject | number)[];
  student: (Student | number)[];
  teacher: (Teacher | number)[];


}

export class SessionResponse {
  content: Session[];
  totalElements: number;
}
