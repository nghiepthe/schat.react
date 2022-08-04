import {AuthApi} from './../apis/auth';
import {MnemonicService, StorageService} from '@services';
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

  async signin(privateKey: string, onSuccess, onFail) {
    if (!privateKey.startsWith('0x')) return;
    this.attempToConnect(privateKey, onSuccess, onFail);
    socket.on('connection', () => {
      StorageService.store('privateKey', privateKey);
      console.log('Saved private key!');
    });
  },

  async restore(enterApp, authen) {
    let privateKey = await StorageService.retrieve('privateKey');
    if (privateKey == null) return enterApp();

    privateKey = JSON.parse(privateKey);
    if (privateKey != null) {
      console.log('Restoring private key: ', privateKey);
      this.attempToConnect(privateKey, enterApp, authen);
    } else {
      return enterApp();
    }
  },

  async attempToConnect(privateKey: string, onSuccess, onError) {
    const signature = await MnemonicService.getSignature(privateKey);
    socket.auth = cb => cb({token: signature});
    socket.disconnect().connect();
    socket.on('connection', onSuccess);
    socket.on('unauthorize', onError);
  },
};
