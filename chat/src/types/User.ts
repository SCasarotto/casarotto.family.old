import { Permission } from './Permission';

export type UserProfile = {
  small?: string;
  large?: string;
};
export type RawUser = {
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: number;
  profile: UserProfile | null;
  profileDateUpdated: number | null;
  permissions: Array<Permission>;
  active: boolean;
};
export type User = RawUser & {
  uid: string;
};
