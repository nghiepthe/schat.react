import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

export const MnemonicService = {
  generate() {
    const {address, privateKey, mnemonic} = ethers.Wallet.createRandom();
    return {address, privateKey, mnemonic: mnemonic.phrase};
  },

  async getSignature(privateKey) {
    const wallet = new ethers.Wallet(privateKey);
    let messageHash = ethers.utils.id('Hello World');
    let messageHashBytes = ethers.utils.arrayify(messageHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let {v, r, s} = ethers.utils.splitSignature(flatSig);
    return {messageHash, v, r, s};
  },

  isPKValid(privateKey: string) {
    return ethers.utils.isHexString(privateKey, 32);
  },

  getWalletFromMnemonic(mnemonic) {
    return ethers.Wallet.fromMnemonic(mnemonic);
  },

  isValidMnemonic(mnemonic) {
    return ethers.utils.isValidMnemonic(mnemonic);
  },
};
