import { Event, createEvent, split } from 'effector';
import { messagerModel } from 'entities/messager';
import { IRegisterEvent } from 'shared/types';

export function passwordValidatorFactory(trigger: Event<IRegisterEvent>) {
  const passwordsEqual = createEvent<IRegisterEvent>();

  split({
    source: trigger,
    match: {
      valid: (data) => data.password === data.repeat_password,
    },
    cases: {
      valid: passwordsEqual,
      __: messagerModel.showError.prepend<IRegisterEvent>(() => ({ msg: 'Пароли не совпадают' })),
    },
  });

  return { passwordsEqual };
}
