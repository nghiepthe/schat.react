import React from 'react';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '@styles';

export function AppNavGradient() {
  const scolors = [Colors.S_FIRST, Colors.S_SECOND, Colors.S_THIRD];
  const hcolors = [Colors.H_FIRST, Colors.H_SECOND, Colors.H_THIRD];
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0}}
        colors={scolors}
        style={{height: StatusBar.currentHeight}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </LinearGradient>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={hcolors}
        style={{flex: 1}}
      />
    </>
  );
}
