import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar as RNStatusBar} from 'react-native';
import {Colors} from '@styles';

export const StatusBar = () => {
  const isFocused = useIsFocused();

  return (
    <RNStatusBar
      backgroundColor={Colors.WHITE}
      barStyle={isFocused ? 'dark-content' : 'light-content'}
    />
  );
};
