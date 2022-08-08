import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store';
import {AppNav, AppSocket} from '@components';

export const Main = () => {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <AppSocket>
          <AppNav />
        </AppSocket>
      </Provider>
    </ReduxProvider>
  );
};
