import { IRoleName } from 'shared/types';

export function isAdmin(role: IRoleName) {
  const roles: IRoleName[] = ['ADMIN'];
  return roles.includes(role);
}
