import {StatusBar} from './statusbar';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Background} from './background';
import {ButtonGroup} from './button-group';
import {Logo} from './logo';
import {WelcomeText} from './welcome-text';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@styles/mixins';
import { Agency } from './agency';

export const AuthWelcome = () => {
  return (
    <Background>
      <Agency />
      <StatusBar />
      <Logo />
      <SafeAreaView style={{flex: 1}}>
        <View style={style.container}>
          <WelcomeText />
          <ButtonGroup />
        </View>
      </SafeAreaView>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: WINDOW_HEIGHT * 0.5,
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
});
