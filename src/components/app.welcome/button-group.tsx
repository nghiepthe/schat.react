import React from 'react';
import {AuthWelcome} from '@constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@styles/mixins';
import {RootStackScreenProps} from '@components/app.nav/types';
import {useNavigation} from '@react-navigation/native';
import {agent} from '@utils';
import {
  CredentialEventTypes,
  CredentialState,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
  ProofEventTypes,
  ProofState,
  ConnectionRecord,
} from '@aries-framework/core';

export const ButtonGroup = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'AuthWelcome'>['navigation']>();
  return (
    <View style={style.containerbutton}>
      {/* Scan Code */}
      <Text style={style.textthird}>{AuthWelcome.INSTRUCTION}</Text>
      <TouchableOpacity
        style={style.buttonlogin}
        onPress={() => navigation.navigate('AppScanCode')}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#0D76C1',
          }}>
          {'Scan QRCode'}
        </Text>
      </TouchableOpacity>

      {/* Đăng nhập */}
      <TouchableOpacity
        style={style.buttonlogout}
        onPress={async () => {
          const response = await fetch(
            'http://192.168.1.6:3000/aries/login-invitation',
          );
          const invitationUrl = await response.text();
          agent.events.on<ProofStateChangedEvent>(
            ProofEventTypes.ProofStateChanged,
            async ({payload}) => {
              console.log(payload.proofRecord.state);
              switch (payload.proofRecord.state) {
                case ProofState.RequestReceived:
                  console.log('received a proof request');
                  const retrievedCredentials =
                    await agent.proofs.getRequestedCredentialsForProofRequest(
                      payload.proofRecord.id,
                      {
                        filterByPresentationPreview: true,
                      },
                    );
                  const requestedCredentials =
                    agent.proofs.autoSelectCredentialsForProofRequest(
                      retrievedCredentials,
                    );
                  await agent.proofs.acceptRequest(
                    payload.proofRecord.id,
                    requestedCredentials,
                  );
                  break;
                case ProofState.Done:
                  console.log('Done presentation proof');
                  break;
              }
            },
          );
          agent.oob.receiveInvitationFromUrl(invitationUrl);
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#FFFFFF',
          }}>
          {'Đăng nhập'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  containerbutton: {
    height: WINDOW_HEIGHT * 0.5,
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
  textthird: {
    marginTop: WINDOW_HEIGHT * 0.085,
    marginBottom: 6,
    fontFamily: 'System',
    fontSize: 13,
    color: '#FFFFFF',
  },
  buttonlogin: {
    width: WINDOW_WIDTH * 0.912,
    height: WINDOW_HEIGHT * 0.057, // cần xem lại
    backgroundColor: '#BEF7FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonlogout: {
    width: WINDOW_WIDTH * 0.912,
    height: WINDOW_HEIGHT * 0.057, // cần xem lại
    marginTop: WINDOW_HEIGHT * 0.0098,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#C0F7FF',
    backgroundColor: '#27aae1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
