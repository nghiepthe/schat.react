import {RootStackScreenProps} from '@components/app.nav/types';
import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

type Props = RootStackScreenProps<'AuthSignupSuccess'>;
export const AuthSignupSuccess = ({navigation, route}: Props) => {
  const {fullName, address, mnemonic, privateKey} = route.params;
  return (
    <View>
      <Text>{'Dang ky thanh cong'}</Text>
      <Text>{fullName}</Text>
      <Text>{address}</Text>
      <Text>{mnemonic}</Text>
      <QRCode value={privateKey} />
    </View>
  );
};
