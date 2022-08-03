import {AuthApi} from './../apis/auth';
import {MnemonicService} from '@services';
import {io} from 'socket.io-client';
import {socket} from '@apis';

export const AuthService = {
  async signup(success, error, values) {
    const {fullName} = values;
    const {address, privateKey, mnemonic} = MnemonicService.generate();
    const {data} = await AuthApi.signup({fullName, address});
    if (data?.success)
      return success({fullName, address, mnemonic, privateKey});
    return error(data?.error);
  },

  async signin(privateKey) {
    const signature = await MnemonicService.getSignature(privateKey);
    socket.auth = cb => cb({token: signature});
    socket.disconnect().connect();
    // socket.on();
    //const {data} = await AuthApi.signin(signature);
    //console.log(data);
    //if (data?.success) return success();
    //return error(data?.error);
  },
  async restore() {},
};
