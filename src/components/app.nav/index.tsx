import {AppLoading, AppScanCode, AuthWelcome} from '@components';
import {RootStackParamList} from '@components/app.nav/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@store';
import {useAppSelector} from '@store/hooks';
import React from 'react';
import {AppNavOptions, AuthWelScrnOpts} from './options';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNav = () => {
  const auth = useAppSelector((state: RootState) => state.auth);

  if (auth.isLoading) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={AppNavOptions}>
        {auth.isSignout ? (
          <Stack.Group>
            <Stack.Screen
              name="AuthWelcome"
              component={AuthWelcome}
              options={AuthWelScrnOpts}
            />
            <Stack.Screen name="AppScanCode" component={AppScanCode} />
          </Stack.Group>
        ) : (
          <Stack.Group>{null}</Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
