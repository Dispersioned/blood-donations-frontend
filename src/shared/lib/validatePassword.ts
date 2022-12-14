type IPasswordConfirmable = {
  password: string;
  repeat_password: string;
};

// export function passwordValidatorFactory<T extends IPasswordConfirmable>(trigger: Event<T>) {
//   const passwordsEqual = createEvent<T>();

//   split({
//     source: trigger,
//     match: {
//       valid: (data) => data.password === data.repeat_password,
//     },
//     cases: {
//       valid: passwordsEqual,
//       __: messagerModel.showError.prepend<T>(() => ({ msg: 'Пароли не совпадают' })),
//     },
//   });

//   return { passwordsEqual };
// }

export function validatePassword<T extends IPasswordConfirmable>(data: T) {
  return data.password === data.repeat_password;
}
