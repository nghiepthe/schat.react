import {AuthApi} from './../apis/auth';
import {MnemonicService} from '@services';

export const AuthService = {
  async signup(success, error, values) {
    const {fullName} = values;
    const {address, privateKey, mnemonic} = MnemonicService.generate();
    const {data} = await AuthApi.signup({fullName, address});
    if (data?.success)
      return success({fullName, address, mnemonic, privateKey});
    return error(data?.error);
  },

  async signin(success, error, privateKey) {
    const signature = await MnemonicService.getSignature(privateKey);
    const {data} = await AuthApi.signin(signature);
    console.log(data);
    if (data?.success) return success();
    return error(data?.error);
  },
  async restore() {},
};
