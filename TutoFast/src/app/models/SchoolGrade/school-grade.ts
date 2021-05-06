export class SchoolGrade {
  id: number;
  name: string;
}

export class SchoolGradeResponse {
  content: SchoolGrade[];
  totalElements: number;
}
