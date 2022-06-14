export interface UserClaims {
  id: number;
  username: number;
  dojoId: string;
  role: 'master' | 'dojo_admin' | 'teacher' | 'student'
}
