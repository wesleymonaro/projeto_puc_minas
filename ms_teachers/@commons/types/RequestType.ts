import { UserClaims } from "./UserClaims";

export interface RequestType extends Request {
  user: UserClaims;
}
