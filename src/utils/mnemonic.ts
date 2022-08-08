import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

export const MnemonicService = {
  getWalletFromMnemonic(mnemonic) {
    if (!this.isValidMnemonic(mnemonic)) throw 'Mnemonic is invalid';
    return ethers.Wallet.fromMnemonic(mnemonic);
  },

  generate() {
    const {address, privateKey, mnemonic} = ethers.Wallet.createRandom();
    return {address, privateKey, mnemonic: mnemonic.phrase};
  },

  async getSignature(privateKey) {
    if (!this.isValidPrivateKey(privateKey)) throw 'Private key is invalid';
    const wallet = new ethers.Wallet(privateKey);
    let messageHash = ethers.utils.id('Hello World');
    let messageHashBytes = ethers.utils.arrayify(messageHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let {v, r, s} = ethers.utils.splitSignature(flatSig);
    return {messageHash, v, r, s};
  },

  isValidMnemonic(mnemonic) {
    return ethers.utils.isValidMnemonic(mnemonic);
  },

  isValidPrivateKey(privateKey: string) {
    return ethers.utils.isHexString(privateKey, 32);
  },
};
