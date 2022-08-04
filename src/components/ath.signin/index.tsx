import {SocketContext} from '@apis';
import {useFocusEffect} from '@react-navigation/native';
import {AuthService} from '@services';
import {onSignin} from '@store/auth.slice';
import {useAppDispatch} from '@store/hooks';
import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const AuthSignin = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const onRead = (e: BarCodeReadEvent) => {
    AuthService.signin(e.data, onSuccess, onError);
  };

  const onSuccess = () => {
    Alert.alert(
      'Thông báo',
      'Xác thực thành công! Bạn sẽ vào app ngay lập tức',
    );
    dispatch(onSignin());
  };
  const onError = () => {
    Alert.alert('Lỗi rồi', 'Người dùng chưa xác thực!');
  };

  useFocusEffect(() => {
    socket.on('connection', onSuccess);
    return () => {
      socket.off('connection', onSuccess);
    };
  });

  useFocusEffect(() => {
    socket.on('unauthorize', onError);
    return () => {
      socket.off('unauthorize', onError);
    };
  });

  return (
    <QRCodeScanner
      onRead={onRead}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Scan identity for <Text style={styles.textBold}>SChat</Text>
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
