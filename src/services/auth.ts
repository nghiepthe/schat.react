import EncryptedStorage from 'react-native-encrypted-storage';
import { MnemonicService, Axios, wrapper, socket, agent } from '@utils';
import { onReconnect } from '@utils/socket';
import { CredentialEventTypes, CredentialState, CredentialStateChangedEvent } from '@aries-framework/core';

const signup = async ({ fullName }) => {
  const { address, privateKey, mnemonic } = MnemonicService.generate();
  const { data } = await Axios.post('user/add', { fullName, address });
  if (data?.error) throw data?.error;
  return { fullName, address, mnemonic, privateKey };
};

const signin = async ({ privateKey }) => {
  const signature = await MnemonicService.getSignature(privateKey);

  const onSave = () => {
    if (socket.auth['token'] === signature)
      EncryptedStorage.setItem('privateKey', privateKey);
    socket.off('connection', onSave);
  };

  socket.on('connection', onSave);
  onReconnect(signature);
};

const signinWithMnemonic = async ({ mnemonic }) => {
  const { privateKey } = MnemonicService.getWalletFromMnemonic(mnemonic);
  signin({ privateKey });
};

const signout = async () => {
  await EncryptedStorage.removeItem('privateKey');
  socket.disconnect();
};

const restore = async () => {
  let privateKey = await EncryptedStorage.getItem('privateKey');
  if (!privateKey) throw 'Private not found';
  signin({ privateKey });
};

const connect = async (invitationUrl) => {
  console.log(invitationUrl)
  agent.events.on<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged, async ({ payload }) => {
    switch (payload.credentialRecord.state) {
      case CredentialState.OfferReceived:
        console.log('received a credential')
        await agent.credentials.acceptOffer({ credentialRecordId: payload.credentialRecord.id })

      case CredentialState.Done:
        console.log(`Credential for credential id ${payload.credentialRecord.id} is accepted`)
        console.log(await agent.credentials.getAll());
    }
  })

  agent.oob.receiveInvitationFromUrl(invitationUrl);
};

export const Signup = wrapper(signup);
export const Signin = wrapper(signin);
export const SigninWithMnemonic = wrapper(signinWithMnemonic);
export const Signout = wrapper(signout);
export const Restore = wrapper(restore);
export const Connect = wrapper(connect);