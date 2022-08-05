import {RootStackScreenProps} from '@components/app.nav/types';
import Clipboard from '@react-native-community/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import {AuthService} from '@services';
import {GRAY_LIGHT, PRIMARY, WARNING, WHITE} from '@styles/colors';
import {WINDOW_WIDTH} from '@styles/mixins';
import {saveQRCode} from '@utils';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

type Props = RootStackScreenProps<'AuthSignupSuccess'>;
export const AuthSignupSuccess = ({navigation, route}: Props) => {
  const {fullName, address, mnemonic, privateKey} = route.params;
  const [loading, setLoading] = useState(false);
  const onSaveQRCode = () => {
    qrcode.toDataURL(data => saveQRCode(data, address + '.png'));
  };
  const onBtnLoginClick = () => {
    setLoading(true);
    setTimeout(async () => {
      await AuthService.signin(privateKey);
      setLoading(false);
    }, 0);
  };

  let qrcode;

  useFocusEffect(() => navigation.setOptions({title: 'Thông tin tài khoản'}));
  return (
    <View style={styleIndex.container}>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>Họ tên: </Text>
        <Text style={styleIndex.textContent}>{fullName}</Text>
      </View>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>Mã định danh (Công khai): </Text>
        <Text style={styleIndex.textContent}>{address}</Text>
        <IconButton
          icon={'content-copy'}
          onPress={() => Clipboard.setString(address)}
          size={20}
        />
      </View>
      <View style={styleIndex.row}>
        <Text style={styleIndex.textName}>Khóa bí mật: </Text>
        <Text style={styleIndex.textContent}>{mnemonic}</Text>
        <IconButton
          icon={'content-copy'}
          onPress={() => Clipboard.setString(mnemonic)}
          size={20}
        />
      </View>
      <Button
        contentStyle={{flexDirection: 'row-reverse', backgroundColor: PRIMARY}}
        icon={'download'}
        mode="contained"
        onPress={onSaveQRCode}>
        Lưu QR Code
      </Button>
      <View style={styleIndex.QRcode}>
        <QRCode value={privateKey} size={250} getRef={c => (qrcode = c)} />
      </View>
      <Button
        style={styleIndex.loginButton}
        color={WHITE}
        onPress={onBtnLoginClick}
        loading={loading}>
        Đăng nhập luôn
      </Button>
    </View>
  );
};

const styleIndex = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GRAY_LIGHT,
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
    width: WINDOW_WIDTH - 32,
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  textName: {
    width: (WINDOW_WIDTH - 52) * 0.28,
    fontWeight: 'bold',
  },
  textContent: {
    width: (WINDOW_WIDTH - 52) * 0.62,
    shadowColor: '#000',
    // borderRadius:5,
    // borderWidth:1,
    // borderColor:"#000000",
    // paddingLeft:5,
    //backgroundColor:"#27AAE1"
  },
  textIcon: {
    width: (WINDOW_WIDTH - 52) * 0.1,
  },
  QRcode: {
    padding: 10,
    alignItems: 'center',
  },
  loginButton: {
    color: WHITE,
    backgroundColor: PRIMARY,
  },
  rowQRcode: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:WARNING,
    justifyContent: 'center',
  },
});
