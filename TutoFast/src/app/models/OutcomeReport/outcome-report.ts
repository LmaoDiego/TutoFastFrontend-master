import {EconomicLevel} from "../EconomicLevel/economic-level";
import {Student} from "../Student/student";
import {Teacher} from "../Teacher/teacher";

export class OutcomeReport {
  id: number;
  student: Student
  teacher: Teacher
}

export class OutcomeReportResponse {
  content: OutcomeReport[];
  totalElements: number;
}
