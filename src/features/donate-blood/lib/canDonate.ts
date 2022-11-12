import { IRoleName } from 'shared/types';

export function canDonate(role: IRoleName) {
  const roles: IRoleName[] = ['DONOR', 'ADMIN'];
  return roles.includes(role);
}
