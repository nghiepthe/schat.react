import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store';
import {AppNav} from '@components';
import {socket, SocketProvider} from '@apis';

export const Main = () => {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <SocketProvider value={socket}>
          <AppNav />
        </SocketProvider>
      </Provider>
    </ReduxProvider>
  );
};
