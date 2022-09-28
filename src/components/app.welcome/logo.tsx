import React from 'react';
import {AuthWelcome} from '@assets/images';
import {Image, StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@styles/mixins';

export const Logo = () => {
  return (
    <>
      <Image
        style={style.imglogo}
        source={AuthWelcome.LOGO_CHAT}
        resizeMode="contain"
      />
      <Image
        style={style.imgmaskgroup}
        source={AuthWelcome.MASK_GROUP}
        resizeMode="contain"
      />
    </>
  );
};

const style = StyleSheet.create({
  imglogo: {
    width: WINDOW_WIDTH * 0.233,
    height: WINDOW_HEIGHT * 0.048,
    marginTop: WINDOW_HEIGHT * 0.045,
    alignSelf: 'center',
  },
  imgmaskgroup: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.38,
    marginTop: WINDOW_HEIGHT * 0.016,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
