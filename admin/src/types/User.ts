import { Permission } from './Permission';

export type RawUser = {
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: number;
  permissions: Array<Permission>;
  active: boolean;
};
export type User = RawUser & {
  uid: string;
};
