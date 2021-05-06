export class Course {
  id: number;
  name: string;
  time: string;
}

export class CourseResponse {
  content: Course[];
  totalElements: number;
}
