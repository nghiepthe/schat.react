import {AppAgent, AppNav, AppSocket} from '@components';
import {store} from '@store';
import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

export const Main = () => {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <AppSocket>
          <AppAgent>
            <AppNav />
          </AppAgent>
        </AppSocket>
      </Provider>
    </ReduxProvider>
  );
};
