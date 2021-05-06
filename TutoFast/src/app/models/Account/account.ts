export class Account {
  id: number;
  username: string;
  password: string;
}

export class AccountResponse {
  content: Account[];
  totalElements: number;
}
