import {socket} from '@apis';
import {RootStackScreenProps} from '@components/app.nav/types';
import {useFocusEffect} from '@react-navigation/native';
import {AuthService} from '@services';
import {Colors} from '@styles';
import React from 'react';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import {Button, Modal, TextInput} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';

type Props = RootStackScreenProps<'AuthSignin'>;
export const AuthSignin: React.FC<Props> = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onRead = (e: BarCodeReadEvent) => {
    AuthService.signin(e.data);
  };
  const onBtnAuthClick = () => {
    AuthService.signinWithMnemonic(mnemonic);
  };
  const onUnauthorize = () => {
    Alert.alert('Lỗi rồi', 'Người dùng chưa xác thực!');
  };

  useFocusEffect(() => navigation.setOptions({title: 'Đăng nhập'}));
  useFocusEffect(() => {
    socket.on('unauthorize', onUnauthorize);
    return () => {
      socket.off('unauthorize', onUnauthorize);
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.boxInput}>
        <TextInput
          value={mnemonic}
          label={'Khóa bảo mật'}
          style={styles.input}
          onChangeText={setMnemonic}
          right={
            <TextInput.Icon
              name="qrcode-scan"
              onPress={() => {
                Keyboard.dismiss();
                showModal();
              }}
            />
          }
        />
      </View>
      <Button
        color={Colors.WHITE}
        style={styles.button}
        onPress={onBtnAuthClick}>
        Xác thực
      </Button>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{position: 'absolute', flex: 1}}>
        <QRCodeScanner onRead={onRead} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  boxInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.WHITE,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
  },
  iconQRCode: {
    alignItems: 'center',
  },
});
