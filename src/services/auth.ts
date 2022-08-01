import {MnemonicService} from '@services';

export const AuthService = {
  signup(success, error, values) {
    try {
      console.log('Generating key....');
      const {address, privateKey, mnemonic} = MnemonicService.generate();
      success({fullName: values.fullName, address, mnemonic, privateKey});
      console.log('Finishing!');
    } catch (e) {
      error(e);
    }
  },

  signin() {},

  restore() {},
};
