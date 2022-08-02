import React from 'react';
import {AuthWelcome} from '@constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@styles/mixins';
import {RootStackScreenProps} from '@components/app.nav/types';
import {useNavigation} from '@react-navigation/native';

export const ButtonGroup = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'AuthWelcome'>['navigation']>();
  return (
    <View style={style.containerbutton}>
      {/* Đăng nhập */}
      <Text style={style.textthird}>{AuthWelcome.INSTRUCTION}</Text>
      <TouchableOpacity
        style={style.buttonlogin}
        onPress={() => navigation.navigate('AuthSignin')}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#0D76C1',
          }}>
          {AuthWelcome.BTN_LOGIN}
        </Text>
      </TouchableOpacity>

      {/* Đăng ký */}
      <TouchableOpacity
        style={style.buttonlogout}
        onPress={() => navigation.navigate('AuthSignup')}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            color: '#FFFFFF',
          }}>
          {AuthWelcome.BTN_SIGNUP}
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
