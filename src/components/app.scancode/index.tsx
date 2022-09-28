import {RootStackScreenProps} from '@components/app.nav/types';
import {useFocusEffect} from '@react-navigation/native';
import {AuthService} from '@services';
import React from 'react';
import {View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

type Props = RootStackScreenProps<'AppScanCode'>;

export const AppScanCode: React.FC<Props> = ({navigation}) => {
  useFocusEffect(() => navigation.setOptions({title: 'Quét mã QRCode'}));
  const onRead = (e: BarCodeReadEvent) => {
    console.log(e.data);
    AuthService.Connect({payload: {invitationUrl: e.data}});
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <QRCodeScanner onRead={onRead} />
    </View>
  );
};
