export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  hospitals: '/hospitals',
} as const;

export const LINKS = [
  { label: 'Профиль', url: ROUTES.home },
  { label: 'Больницы', url: ROUTES.hospitals },
];
