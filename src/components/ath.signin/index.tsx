import {RootStackScreenProps} from '@components/app.nav/types';
import {useFocusEffect} from '@react-navigation/native';
import {SigninSchema} from '@schemas';
import {AuthService} from '@services';
import {AgentContext, socket} from '@utils';
import {Colors} from '@styles';
import {Formik} from 'formik';
import React, {useContext, useState} from 'react';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  CredentialEventTypes,
  CredentialState,
  CredentialStateChangedEvent,
} from '@aries-framework/core';

type Props = RootStackScreenProps<'AuthSignin'>;
export const AuthSignin: React.FC<Props> = ({navigation}) => {
  useFocusEffect(() => navigation.setOptions({title: 'Đăng nhập'}));
  const agent = useContext(AgentContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onStart = () => {
    hideModal();
    setLoading(true);
  };

  const onError = error => {
    setLoading(false);
    Alert.alert('Thông báo', error);
  };
  const onFinish = () => {};

  const onRead = (e: BarCodeReadEvent) => {
    console.log(e.data);
    agent.events.on<CredentialStateChangedEvent>(
      CredentialEventTypes.CredentialStateChanged,
      async ({payload}) => {
        console.log('vao day');

        switch (payload.credentialRecord.state) {
          case CredentialState.OfferReceived:
            console.log('received a credential');
            await agent.credentials.acceptOffer({
              credentialRecordId: payload.credentialRecord.id,
            });

          case CredentialState.Done:
            console.log(
              `Credential for credential id ${payload.credentialRecord.id} is accepted`,
            );
            console.log(await agent.credentials.getAll());
        }
      },
    );
    agent.oob.receiveInvitationFromUrl(
      'ws://192.168.1.6:3001?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiI2NThkMzkwOC0wNWJkLTQ5YjAtOTNmOC0zZGU4YTNiZWNmMjMiLCJsYWJlbCI6ImRlbW8tYWdlbnQtaXNzdWVyLTExIiwiYWNjZXB0IjpbImRpZGNvbW0vYWlwMSIsImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwiaGFuZHNoYWtlX3Byb3RvY29scyI6WyJodHRwczovL2RpZGNvbW0ub3JnL2RpZGV4Y2hhbmdlLzEuMCIsImh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wIl0sInNlcnZpY2VzIjpbeyJpZCI6IiNpbmxpbmUtMCIsInNlcnZpY2VFbmRwb2ludCI6IndzOi8vMTkyLjE2OC4xLjY6MzAwMSIsInR5cGUiOiJkaWQtY29tbXVuaWNhdGlvbiIsInJlY2lwaWVudEtleXMiOlsiZGlkOmtleTp6Nk1rb2pINHNHaVdpeXU2VmVhWTlUZXFHWjZWRVQ0WTVLUVpIN2ptcWhINTR6bjIiXSwicm91dGluZ0tleXMiOltdfV19',
    );

    // AuthService.Connect({onStart, onFinish, onError, payload: e.data});
    // AuthService.Signin({
    //   onStart,
    //   onFinish,
    //   onError,
    //   payload: {privateKey: e.data},
    // });
  };

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
