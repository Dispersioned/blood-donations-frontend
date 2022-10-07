import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchMe, loginUser } from 'shared/api';
import { AuthDto, IUser } from 'shared/types';

export const login = createEvent<AuthDto>();
export const register = createEvent<AuthDto>();
export const checkToken = createEvent();
const validateToken = createEvent<string>();
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
export const $user = createStore<IUser | null>(null);
export const $definedUser = createStore<IUser>({} as IUser);

sample({
  source: $user,
  filter: (user): user is IUser => !!user,
  target: $definedUser,
});

$user.on(exit, () => null);

$user.watch((u) => console.log('user', u));

$authPending.on(loginFx.pending, (_, is) => is);
$authPending.on(validateTokenFx.pending, (_, is) => is);

sample({
  clock: exit,
  target: exitFx,
});

sample({
  clock: login,
  target: loginFx,
});

sample({
  clock: checkToken,
  source: $token,
  filter: (token): token is string => !!token,
  target: validateToken,
});

sample({
  clock: validateToken,
  filter: validateTokenFx.pending.map((is) => !is),
  target: validateTokenFx,
});

sample({
  clock: [loginFx.doneData, validateTokenFx.doneData],
  target: $user,
});
