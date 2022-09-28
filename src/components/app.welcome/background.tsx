import React, {PropsWithChildren} from 'react';
import {AuthWelcome} from '@assets/images';
import {Image, ImageBackground, StyleSheet} from 'react-native';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@styles/mixins';

export const Background: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ImageBackground
      style={style.imgBack}
      source={AuthWelcome.BACKGROUND}
      resizeMode="stretch">
      <Image
        style={style.imgfirstclass}
        source={AuthWelcome.BACKGROUND_TOP}
        resizeMode="stretch"
      />
      {/* lớp thứ 1 */}
      <Image
        style={style.imgsecondclass}
        source={AuthWelcome.BACKGROUND_TOP}
        resizeMode="stretch"
      />
      {/* lớp thứ 2 */}
      <Image
        style={style.imgthirdclass}
        source={AuthWelcome.BACKGROUND_TOP}
        resizeMode="stretch"
      />
      {children}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  imgBack: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    position: 'absolute',
  },
  imgfirstclass: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.58,
    position: 'absolute',
    tintColor: '#36b0e3',
  },
  imgsecondclass: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.55,
    position: 'absolute',
    tintColor: '#5ec0e9',
  },
  imgthirdclass: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.525,
    position: 'absolute',
  },
});
