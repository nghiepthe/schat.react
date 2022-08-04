import {IconButton, Menu} from 'react-native-paper';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from '@styles';
import {AppNavGradient} from './gradient';
import React from 'react';
import {HeaderMenu} from './header-menu';

export const AppNavOptions: NativeStackNavigationOptions = {
  headerBackground: AppNavGradient,
  headerTitleStyle: {color: Colors.WHITE},
  headerTintColor: Colors.WHITE,
};

export const AuthWelScrnOpts: NativeStackNavigationOptions = {
  headerShown: false,
  headerBackground: undefined,
};

export const MainTabOpts: NativeStackNavigationOptions = {
  headerLeft: props => (
    <IconButton icon="magnify" color="white" onPress={() => {}} {...props} />
  ),
  headerRight: props => <HeaderMenu {...props} />,
  headerTitle: 'Tìm kiếm',
};
