import {ARCIFORM} from '@assets/fonts';
import {AuthService} from '@services';
import {onLoadingComplete, onSignout} from '@store/auth.slice';
import {useAppDispatch} from '@store/hooks';
import {BLACK, SHAPE, WHITE} from '@styles/colors';
import {AgentContext, socket} from '@utils';
import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Status} from './status';

export const AppLoading = () => {
  const dispatch = useAppDispatch();

  const onError = () => dispatch(onSignout());
  const onUnauthorize = () => dispatch(onSignout());
  const onFinishingLoading = () => dispatch(onLoadingComplete());

  const agent = useContext(AgentContext);
  useEffect(() => {
    //socket.on('unauthorize', onUnauthorize);
    return () => {
      //socket.off('unauthorize', onUnauthorize);
    };
  }, []);

  //useEffect(() => AuthService.Restore({onError}), []);
  useEffect(() => {
    async function initAgent() {
      if (!agent.isInitialized) await agent.initialize().catch(console.log);
      // const response = await fetch(
      //   'http://192.168.1.6:3000/aries/get-invitation',
      // );
      // const invitationUrl = await response.text();
      // await agent.oob.receiveInvitationFromUrl(invitationUrl);
      onFinishingLoading();
    }
    setTimeout(() => initAgent(), 0);
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
