import {ARCIFORM} from '@assets/fonts';
import {AuthService} from '@services';
import {onLoadingComplete} from '@store/auth.slice';
import {useAppDispatch} from '@store/hooks';
import {BLACK, SHAPE, WHITE} from '@styles/colors';
import {AgentContext} from '@utils';
import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Flex} from 'react-native-flex-layout';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Status} from './status';

export const AppLoading = () => {
  const dispatch = useAppDispatch();
  const agent = useContext(AgentContext);
  const onFinishingLoading = () => dispatch(onLoadingComplete());

  useEffect(() => {
    async function initAgent() {
      if (!agent.isInitialized) await agent.initialize().catch(console.log);
      // const oobrecords = await agent.oob.getAll();
      // oobrecords.forEach(element => {
      //   agent.oob.deleteById(element.id);
      // });
      console.log(await agent.oob.getAll());
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
