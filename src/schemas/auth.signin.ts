import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  mnemonic: Yup.string()
    .matches(/^(\w ){11}(\w)$/, 'Incorrect format')
    .required('Required'),
});
