import {instance} from './axios';

const path = {
  signup: 'user/add',
  signin: 'user/auth',
};

export const AuthApi = {
  signup({fullName, address}) {
    return instance.post(path.signup, {fullName, address});
  },
  signin(signerature) {
    return instance.post(path.signin, signerature);
  },
};
