export interface User {
  user: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: 'M' | 'F';
}
