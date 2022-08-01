import React, {useEffect} from 'react';
import {Flex} from 'react-native-flex-layout';
import {ActivityIndicator, Text} from 'react-native-paper';
import {Status} from './status';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {restore} from '@store/auth.slice';
import {SHAPE, BLACK, WHITE} from '@styles/colors';
import {ARCIFORM} from '@assets/fonts';
import {useAppDispatch} from '@store/hooks';

export const AppLoading = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(restore()), 500);
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
