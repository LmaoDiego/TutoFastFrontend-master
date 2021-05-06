import {Teacher} from "../Teacher/teacher";
import {Parent} from "../Parent/parent";
import {Session} from "../Session/session";

export class Review {
  id: number;
  description: string;
  stars: number;
  teacher: Teacher;
  parent: Parent;
}

export class ReviewResponse {
  content: Review[];
  totalElements: number;
}
