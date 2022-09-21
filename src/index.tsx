import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store';
import {AppNav, AppSocket} from '@components';

import type {InitConfig} from '@aries-framework/core';
import {
  Agent,
  WsOutboundTransport,
  HttpOutboundTransport,
} from '@aries-framework/core';
import {agentDependencies} from '@aries-framework/react-native';

// The agent initialization configuration
const config: InitConfig = {
  label: 'docs-rn-agent',
  walletConfig: {
    id: 'wallet-id',
    key: 'testkey0000000000000000000000000',
  },
};

// Creating an agent instance
const agent = new Agent(config, agentDependencies);

// Registering the required outbound transport
agent.registerOutboundTransport(new HttpOutboundTransport());
agent.registerOutboundTransport(new WsOutboundTransport());

// Function to initialize the agent
const initialize = async () => await agent.initialize().catch(console.error);

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
