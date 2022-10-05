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
  PresentationPreview,
  PresentationPreviewAttribute,
} from '@aries-framework/core';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@store/hooks';
import { selectConnectionId } from '@store/auth.slice';

export const ButtonGroup = () => {
  const connectionId = useAppSelector(selectConnectionId);
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
          await agent.proofs.proposeProof(connectionId, new PresentationPreview({
            attributes: [
              new PresentationPreviewAttribute({
                name: 'id',
                credentialDefinitionId: "PLEVLDPJQMJvPLyX3LgB6S:3:CL:11:default"
              }),
              new PresentationPreviewAttribute({
                name: 'name',
                credentialDefinitionId: "PLEVLDPJQMJvPLyX3LgB6S:3:CL:11:default"
              }),
              new PresentationPreviewAttribute({
                name: 'role',
                credentialDefinitionId: "PLEVLDPJQMJvPLyX3LgB6S:3:CL:11:default"
              })
            ]
          }));
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
          const oob = await agent.oob.getAll();
          const con = await agent.connections.getAll();
          console.log(`oob: ${oob.length} - con: ${con.length}`);
          con.forEach(c => console.log(c.isReady ? "\u2705 " : "❌ ", c.id, c.theirLabel))
          con.map(c => c.isReady && agent.basicMessages.sendMessage(c.id, "hello"))
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
      <TouchableOpacity
        style={style.buttonlogout}
        onPress={async () => {
          const oob = await agent.oob.getAll();
          const con = await agent.connections.getAll();
          await Promise.all(oob.map(async o => await agent.oob.deleteById(o.id)));
          await Promise.all(con.map(async c => await agent.connections.deleteById(c.id)));
          console.log("Done clearing!");

        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#FFFFFF',
          }}>
          {'Clear'}
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
