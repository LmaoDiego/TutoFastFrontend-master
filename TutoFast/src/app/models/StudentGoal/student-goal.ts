import {Subject} from "../Subject/subject";
import {OutcomeReport} from "../OutcomeReport/outcome-report";
import {Session} from "../Session/session";

export class StudentGoal {
  id: number;
  statement: string;
  evaluation: string;
  outcomeReport: OutcomeReport;
  subject: Subject;
  session: Session

}

export class StudentGoalResponse {
  content: StudentGoal[];
  totalElements: number;
}
