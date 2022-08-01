import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
