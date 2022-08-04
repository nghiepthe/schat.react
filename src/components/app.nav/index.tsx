import {
  AppLoading,
  AuthWelcome,
  AuthSignup,
  AuthSignupSuccess,
  AuthSignin,
} from '@components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {AppNavOptions, AuthWelScrnOpts} from './options';
import {RootStackParamList} from '@components/app.nav/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {RootState} from '@store';
import {SocketContext} from '@apis';
import {onSignin, onSignout, onLoadingComplete} from '@store/auth.slice';
import {socket, SocketProvider} from '@apis';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNav = () => {
  const dispatch = useAppDispatch();

  const onSocketConnect = () => {
    console.log('Connected to server!');
    dispatch(onSignin());
  };

  const onSocketDisconnect = () => {
    console.log('Disconnected from server!');
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
    <SocketProvider value={socket}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={AppNavOptions}>
          {!auth.isSignout ? (
            <Stack.Group>
              <Stack.Screen
                name="AuthWelcome"
                component={AuthWelcome}
                options={AuthWelScrnOpts}
              />
              <Stack.Screen name="AuthSignup" component={AuthSignup} />
              <Stack.Screen
                name="AuthSignupSuccess"
                component={AuthSignupSuccess}
              />
              <Stack.Screen name="AuthSignin" component={AuthSignin} />
            </Stack.Group>
          ) : (
            <Stack.Screen name="AuthSignin" component={AuthSignin} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
};
