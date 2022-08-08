import {RootStackScreenProps} from '@components/app.nav/types';
import {useFocusEffect} from '@react-navigation/native';
import {SigninSchema} from '@schemas';
import {AuthService} from '@services';
import {socket} from '@utils';
import {Colors} from '@styles';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';

type Props = RootStackScreenProps<'AuthSignin'>;
export const AuthSignin: React.FC<Props> = ({navigation}) => {
  useFocusEffect(() => navigation.setOptions({title: 'Đăng nhập'}));

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onStart = () => {
    hideModal();
    setLoading(true);
  };

  const onError = error => Alert.alert('Thông báo', error);
  const onFinish = () => setLoading(false);

  const onRead = (e: BarCodeReadEvent) =>
    AuthService.Signin({
      onStart,
      onFinish,
      onError,
      payload: {privateKey: e.data},
    });

  const onLogin = payload => {
    AuthService.SigninWithMnemonic({
      onStart,
      onFinish,
      onError,
      payload,
    });
  };

  const onUnauthorize = () => {
    Alert.alert('Thông báo', 'Tài khoản không tồn tại!');
  };

  useFocusEffect(() => {
    socket.on('unauthorize', onUnauthorize);
    return () => {
      socket.off('unauthorize', onUnauthorize);
    };
  });

  return (
    <Formik
      initialValues={{mnemonic: ''}}
      validationSchema={SigninSchema}
      onSubmit={onLogin}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <View style={styles.boxInput}>
            <TextInput
              label={'Khóa bảo mật'}
              value={values.mnemonic}
              onChangeText={handleChange('mnemonic')}
              onBlur={handleBlur('mnemonic')}
              numberOfLines={5}
              multiline={true}
              style={styles.input}
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
            {errors.mnemonic && touched.mnemonic ? (
              <Text>{errors.mnemonic}</Text>
            ) : null}
          </View>
          <Button
            color={Colors.WHITE}
            style={styles.button}
            onPress={handleSubmit}
            loading={loading}>
            Xác thực
          </Button>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{position: 'absolute', flex: 1}}>
            <QRCodeScanner onRead={onRead} />
          </Modal>
        </View>
      )}
    </Formik>
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