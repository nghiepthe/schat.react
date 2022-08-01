import {RootStackScreenProps} from '@components/app.nav/types';
import Clipboard from '@react-native-community/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import {WINDOW_WIDTH} from '@styles/mixins';
import {saveQRCode} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

type Props = RootStackScreenProps<'AuthSignupSuccess'>;
export const AuthSignupSuccess = ({navigation, route}: Props) => {
  const {fullName, address, mnemonic, privateKey} = route.params;
  const onSaveQRCode = () => {
    qrcode.toDataURL(data => saveQRCode(data, address + '.png'));
  };

  let qrcode;

  useFocusEffect(() => navigation.setOptions({title: 'Thông tin tài khoản'}));
  return (
    <View style={styleIndex.container}>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>Tên tài khoản: </Text>
        <Text style={styleIndex.textContent}>{fullName}</Text>
      </View>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>address: </Text>
        <Text style={styleIndex.textContent}>{address}</Text>
        <IconButton
          icon={'content-copy'}
          onPress={() => Clipboard.setString(address)}
        />
      </View>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>mnemonic: </Text>
        <Text style={styleIndex.textContent}>{mnemonic}</Text>
        <IconButton
          icon={'content-copy'}
          onPress={() => Clipboard.setString(mnemonic)}
        />
      </View>
      <View style={styleIndex.QRcode}>
        <Text style={styleIndex.textName}>Mã QR code</Text>
        <QRCode value={privateKey} size={300} getRef={c => (qrcode = c)} />
        <IconButton icon={'download'} size={50} onPress={onSaveQRCode} />
      </View>
    </View>
  );
};

const styleIndex = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: '#27AAE1',
  },
  row: {
    width: WINDOW_WIDTH - 20,
    flexDirection: 'row',
    marginBottom: 5,
    //backgroundColor:"#27AAE1",
  },
  textName: {
    width: (WINDOW_WIDTH - 20) * 0.25,
    fontWeight: 'bold',
  },
  textContent: {
    width: (WINDOW_WIDTH - 20) * 0.65,
    shadowColor: '#000',
    // borderRadius:5,
    // borderWidth:1,
    // borderColor:"#000000",
    // paddingLeft:5,
    //backgroundColor:"#27AAE1"
  },
  textIcon: {
    width: (WINDOW_WIDTH - 20) * 0.1,
  },
  QRcode: {
    padding: 10,
    alignItems: 'center',
  },
});
