import {socket} from '@apis';
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
import {onSignin, onSignout} from '@store/auth.slice';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import React, {useEffect} from 'react';
import {MainTab} from './main-tab';
import {AppNavOptions, AuthWelScrnOpts, MainTabOpts} from './options';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNav = () => {
  const dispatch = useAppDispatch();

  const onSocketConnect = () => {
    dispatch(onSignin());
  };

  const onSocketDisconnect = () => {
    dispatch(onSignout());
  };

  useEffect(() => {
    socket.on('connection', onSocketConnect);
    socket.on('disconnect', onSocketDisconnect);
    return () => {
      socket.off('connection', onSocketConnect);
      socket.off('disconnect', onSocketDisconnect);
    };
  }, []);

  const auth = useAppSelector((state: RootState) => state.auth);

  if (auth.isLoading) return <AppLoading />;

  return (
    // <SocketProvider value={socket}>
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
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={MainTabOpts}
            />
            <Stack.Screen
              name="AuthSignupSuccess"
              component={AuthSignupSuccess}
            />
            <Stack.Screen name="DetailedTask" component={DetailedTask} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    //  </SocketProvider>
  );
};
