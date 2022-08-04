import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store';
import {AppNav} from '@components';

export const Main = () => {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <AppNav />
      </Provider>
    </ReduxProvider>
  );
};
