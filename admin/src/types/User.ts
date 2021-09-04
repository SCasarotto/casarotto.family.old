import { Permission } from './Permission';

export type RawUser = {
  firstName: string;
  lastName: string;
  email: string;
  permissions: Array<Permission>;
  active: boolean;
};
export type User = RawUser & {
  uid: string;
};
