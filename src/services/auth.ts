import {AuthApi} from './../apis/auth';
import {MnemonicService, StorageService} from '@services';
import {socket} from '@apis';
import {ethers} from 'ethers';

export const AuthService = {
  async signup(success, error, values) {
    const {fullName} = values;
    const {address, privateKey, mnemonic} = MnemonicService.generate();
    const {data} = await AuthApi.signup({fullName, address});
    if (data?.success) {
      return success({fullName, address, mnemonic, privateKey});
    }
    return error(data?.error);
  },

  async signin(privateKey: string) {
    if (privateKey && MnemonicService.isPKValid(privateKey)) {
      StorageService.store('privateKey', privateKey);
      this.attempToConnect(privateKey);
    }
  },

  async signinWithMnemonic(mnemonic: string) {
    if (!MnemonicService.isValidMnemonic(mnemonic)) return;
    const wallet = MnemonicService.getWalletFromMnemonic(mnemonic);
    this.signin(wallet.privateKey);
  },

  async signout() {
    await StorageService.del('privateKey');
    socket.disconnect();
  },

  async restore(onPKNotFound) {
    let privateKey = await StorageService.retrieve('privateKey');
    if (privateKey && MnemonicService.isPKValid(privateKey)) {
      this.attempToConnect(privateKey);
    } else {
      onPKNotFound();
    }
  },

  async attempToConnect(privateKey: string) {
    const signature = await MnemonicService.getSignature(privateKey);
    socket.auth = cb => cb({token: signature});
    socket.disconnect().connect();
  },
};
