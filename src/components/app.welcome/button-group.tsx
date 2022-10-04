import React from 'react';
import { AuthWelcome } from '@constants';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '@styles/mixins';
import { RootStackScreenProps } from '@components/app.nav/types';
import { useNavigation } from '@react-navigation/native';
import { agent } from '@utils';
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
            'http://192.168.1.6:3000/agent/get-login-url',
          );
          const invitationUrl = await response.text();
          console.log(invitationUrl);
          agent.oob.receiveInvitationFromUrl(invitationUrl, { reuseConnection: true });

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
      <TouchableOpacity
        style={style.buttonlogout}
        onPress={async () => {
          //await agent.oob.receiveInvitationFromUrl("ws://192.168.1.6:4000?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiJlZTEyZTA2MC0zNTNjLTRlYjMtYmNhZi1kNzRjOTg2NzQxMDkiLCJsYWJlbCI6InNjaGF0LWJlLWFnZW50LTEzIiwiYWNjZXB0IjpbImRpZGNvbW0vYWlwMSIsImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwiaGFuZHNoYWtlX3Byb3RvY29scyI6WyJodHRwczovL2RpZGNvbW0ub3JnL2RpZGV4Y2hhbmdlLzEuMCIsImh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wIl0sInNlcnZpY2VzIjpbeyJpZCI6IiNpbmxpbmUtMCIsInNlcnZpY2VFbmRwb2ludCI6IndzOi8vMTkyLjE2OC4xLjY6NDAwMCIsInR5cGUiOiJkaWQtY29tbXVuaWNhdGlvbiIsInJlY2lwaWVudEtleXMiOlsiZGlkOmtleTp6Nk1rcTJNUkM3dDVOS1plQlhMUlEyZVk2aFp4eXdQTUVKdEhpTkdKR0dzNU1RMmciXSwicm91dGluZ0tleXMiOltdfV19", { reuseConnection: true });
          const oob = await agent.oob.getAll();
          const con = await agent.connections.getAll();
          //  con.forEach(o => console.log(o.isReady));
          // oob.forEach(o => agent.oob.deleteById(o.id));
          // con.forEach(o => agent.connections.deleteById(o.id));
          console.log("GG", JSON.stringify(oob), JSON.stringify(con));
          oob[0].outOfBandInvitation.
            con.forEach(c => !c.isReady && agent.basicMessages.sendMessage(c.id, "hello"))
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#FFFFFF',
          }}>
          {'Test'}
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
