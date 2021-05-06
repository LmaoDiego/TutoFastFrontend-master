import {Session} from "../Session/session";


export class Attendance {
  id: number;
  firstConfirmation: boolean;
  secondConfirmation:  boolean;

  session: ( Session | number)[];
}

export class AttendanceResponse {
  content: Attendance[];
  totalElements: number;
}
