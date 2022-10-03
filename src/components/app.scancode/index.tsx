import {RootStackScreenProps} from '@components/app.nav/types';
import {useFocusEffect} from '@react-navigation/native';
import {AgentContext} from '@utils';
import React, {useContext} from 'react';
import {View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

type Props = RootStackScreenProps<'AppScanCode'>;
export const AppScanCode: React.FC<Props> = ({navigation}) => {
  const agent = useContext(AgentContext);
  const onRead = (e: BarCodeReadEvent) => {
    agent.oob.receiveInvitationFromUrl(e.data);
  };

  useFocusEffect(() => navigation.setOptions({title: 'Quét mã QRCode'}));
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
