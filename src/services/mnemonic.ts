import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

export const MnemonicService = {
  generate() {
    const {address, privateKey, mnemonic} = ethers.Wallet.createRandom();
    return {address, privateKey, mnemonic: mnemonic.phrase};
  },
};
