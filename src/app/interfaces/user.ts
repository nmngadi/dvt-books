export interface User {
  'http://localhost:4200/claims/role': string[];
  nickname: string;
  name: string;
  picture: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
  sub: string;
}
