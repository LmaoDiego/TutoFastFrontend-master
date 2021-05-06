export class Category {
  id: number;
  name: string;
}

export class CategoryResponse {
  content: Category[];
  totalElements: number;
}
