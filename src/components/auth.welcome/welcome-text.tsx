import React from 'react';
import {AuthWelcome} from '@constants';
import {StyleSheet, Text} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@styles/mixins';

export const WelcomeText = () => {
  return (
    <>
      <Text style={style.textfirst}>{AuthWelcome.HELLO_FIRST}</Text>
      <Text style={style.textsecond}>
        <Text>{AuthWelcome.WELCOME}</Text>
        <Text style={{fontWeight: 'bold'}}>{AuthWelcome.APP_NAME}</Text>
      </Text>
    </>
  );
};

const style = StyleSheet.create({
  textfirst: {
    marginTop: WINDOW_HEIGHT * 0.1,
    fontSize: WINDOW_HEIGHT * 0.046,
    color: '#FFFFFF',
  },
  textsecond: {
    fontFamily: 'System',
    fontSize: WINDOW_HEIGHT * 0.018,
    color: '#FFFFFF',
  },
});
