import {socket} from '@apis';
import {ARCIFORM} from '@assets/fonts';
import {AuthService} from '@services';
import {onSignin, onSignout} from '@store/auth.slice';
import {useAppDispatch} from '@store/hooks';
import {BLACK, SHAPE, WHITE} from '@styles/colors';
import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Status} from './status';

export const AppLoading = () => {
  //const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const onPKNotFound = () => dispatch(onSignout());
  const onUnauthorize = () => {
    dispatch(onSignout());
  };

  useEffect(() => {
    socket.on('unauthorize', onUnauthorize);
    return () => {
      socket.off('unauthorize', onUnauthorize);
    };
  }, []);

  useEffect(() => {
    AuthService.restore(onPKNotFound);
  }, []);

  return (
    <Flex fill items="center" justify="center" bg={SHAPE}>
      <Status color={SHAPE} black={BLACK} />
      <Text style={style.logoText}>SChat</Text>
      <ActivityIndicator color={WHITE} />
    </Flex>
  );
};

const style = StyleSheet.create({
  logoText: {fontSize: 100, color: WHITE, fontFamily: ARCIFORM},
});
