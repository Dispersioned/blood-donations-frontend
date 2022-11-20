import { IRoleName } from 'shared/types';

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  hospitals: '/hospitals',
  doctors: '/doctors',
  patients: '/patients',
  requests: '/requests',
} as const;

type IRoute = {
  label: string;
  url: typeof ROUTES[keyof typeof ROUTES];
  access?: IRoleName[];
};

// don't forget to create route in routing!
export const LINKS: IRoute[] = [
  { label: 'Профиль', url: ROUTES.home },
  { label: 'Запросы крови', url: ROUTES.requests, access: ['PATIENT', 'DOCTOR', 'ADMIN'] },
  { label: 'Больницы', url: ROUTES.hospitals },
  { label: 'Доктора', url: ROUTES.doctors, access: ['DOCTOR', 'ADMIN'] },
  { label: 'Пациенты', url: ROUTES.patients, access: ['DOCTOR', 'ADMIN'] },
];
