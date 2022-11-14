import { IRoleName } from 'shared/types';

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  hospitals: '/hospitals',
  doctors: '/doctors',
  patients: '/patients',
} as const;

type IRoute = {
  label: string;
  url: typeof ROUTES[keyof typeof ROUTES];
  access?: IRoleName[];
};

export const LINKS: IRoute[] = [
  { label: 'Профиль', url: ROUTES.home },
  { label: 'Больницы', url: ROUTES.hospitals },
  { label: 'Доктора', url: ROUTES.doctors, access: ['DOCTOR', 'ADMIN'] },
  { label: 'Пациенты', url: ROUTES.patients, access: ['DOCTOR', 'ADMIN'] },
];
