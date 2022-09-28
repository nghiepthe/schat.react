import {AppNav} from '@components';
import {store} from '@store';
import {agent, AgentContext} from '@utils';
import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

export const Main = () => {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <AgentContext.Provider value={agent}>
          <AppNav />
        </AgentContext.Provider>
      </Provider>
    </ReduxProvider>
  );
};
