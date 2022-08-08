import {
  AppLoading,
  AuthSignin,
  AuthSignup,
  AuthSignupSuccess,
  AuthWelcome,
  DetailedTask,
} from '@components';
import {RootStackParamList} from '@components/app.nav/types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@store';
import {useAppSelector} from '@store/hooks';
import React from 'react';
import {MainTab} from './main-tab';
import {AppNavOptions, AuthWelScrnOpts, MainTabOpts} from './options';

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
            <Stack.Screen name="AuthSignup" component={AuthSignup} />
            <Stack.Screen name="AuthSignin" component={AuthSignin} />
            <Stack.Screen
              name="AuthSignupSuccess"
              component={AuthSignupSuccess}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={MainTabOpts}
            />
            <Stack.Screen name="DetailedTask" component={DetailedTask} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
