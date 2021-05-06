import {Filee} from "../Filee/filee";
import {Teacher} from "../Teacher/teacher";

export class Application {
  id: number;
  state: string;
  message: string;
  file: Filee;
  teacher: Teacher;
}

export class ApplicationResponse {
  content: Application[];
  totalElements: number;
}

