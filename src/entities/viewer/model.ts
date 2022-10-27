import { createEffect, createEvent, createStore, sample, split } from 'effector';
import { showError } from 'entities/messager';
import { fetchMe, loginUser } from 'shared/api';
import { AuthDto, IRoleName, IUser } from 'shared/types';

export const login = createEvent<AuthDto>();
export const register = createEvent<AuthDto>();
export const checkToken = createEvent();
const validateToken = createEvent<string>();
const invalidateToken = createEvent<any>();
export const exit = createEvent();

const loginFx = createEffect(async (data: AuthDto) => {
  const { user, token } = await loginUser(data.login, data.password);
  localStorage.setItem('token', token);
  return user;
});
const validateTokenFx = createEffect(async (token: string) => {
  const { user } = await fetchMe(token);
  return user;
});
const exitFx = createEffect(() => {
  localStorage.removeItem('token');
});

const $token = createStore(localStorage.getItem('token'));
export const $authPending = createStore(true);
export const $userSys = createStore<IUser | null>(null);
// nullable user is cutted by react router guards
export const $user = createStore<IUser>({} as IUser);
export const $userRole = $userSys.map((v) => v?.role.value as IRoleName);

sample({
  source: $userSys,
  filter: (user): user is IUser => !!user,
  target: $user,
});

$userSys.on(exit, () => null);

$userSys.watch((u) => console.log('user', u));

$authPending.on(loginFx.pending, (_, is) => is);
$authPending.on(validateTokenFx.pending, (_, is) => is);
$authPending.on(invalidateToken, () => false);

sample({
  clock: exit,
  target: exitFx,
});

sample({
  clock: login,
  target: loginFx,
});

split({
  clock: checkToken,
  source: $token,
  match: {
    exist: (token) => !!token,
    nonexist: (token) => !token,
  },
  cases: {
    exist: validateToken,
    nonexist: invalidateToken,
  },
});

sample({
  clock: validateToken,
  filter: validateTokenFx.pending.map((is) => !is),
  target: validateTokenFx,
});

sample({
  clock: [loginFx.doneData, validateTokenFx.doneData],
  target: $userSys,
});

loginFx.fail.watch(() => showError({ msg: 'Неправильный логин или пароль' }));
