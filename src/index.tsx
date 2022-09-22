import React from 'react';
import {Provider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store';
import {AppNav, AppSocket} from '@components';

import {
  ConnectionEventTypes,
  ConnectionInvitationMessage,
  ConnectionStateChangedEvent,
  DidExchangeState,
  InitConfig,
  OutOfBandInvitation,
  OutOfBandRecord,
} from '@aries-framework/core';
import {
  Agent,
  WsOutboundTransport,
  HttpOutboundTransport,
} from '@aries-framework/core';
import {agentDependencies} from '@aries-framework/react-native';

const setupConnectionListener = (
  agent: Agent,
  outOfBandRecord: OutOfBandRecord,
  cb: (...args: any) => void,
) => {
  agent.events.on<ConnectionStateChangedEvent>(
    ConnectionEventTypes.ConnectionStateChanged,
    ({payload}) => {
      if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id) return;
      if (payload.connectionRecord.state === DidExchangeState.Completed) {
        // the connection is now ready for usage in other protocols!
        console.log(
          `Connection for out-of-band id ${outOfBandRecord.id} completed`,
        );
        // Custom business logic can be included here
        // In this example we can send a basic message to the connection, but
        // anything is possible
        cb();
        // We exit the flow
        process.exit(0);
      }
    },
  );
};

const initializeHolderAgent = async () => {
  // The agent initialization configuration
  const config: InitConfig = {
    label: 'docs-rn-agent-c',
    walletConfig: {
      id: 'wallet-id-22',
      key: 'testkey0000000000000000000000000',
    },
    autoAcceptConnections: true,
  };

  // Creating an agent instance
  const agent = new Agent(config, agentDependencies);

  // Registering the required outbound transport
  agent.registerOutboundTransport(new HttpOutboundTransport());
  agent.registerOutboundTransport(new WsOutboundTransport());

  // Function to initialize the agent
  await agent.initialize().catch(console.error);

  console.log('start');

  const {outOfBandRecord} = await agent.oob.receiveInvitationFromUrl('http://192.168.43.201:8000/?oob=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9vdXQtb2YtYmFuZC8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYWM3ZWFkOWItYzI1My00ZWNlLWI3YTctZjk1YTViYzBmNDA4IiwgImhhbmRzaGFrZV9wcm90b2NvbHMiOiBbImRpZDpzb3Y6QnpDYnNOWWhNcmpIaXFaRFRVQVNIZztzcGVjL2RpZGV4Y2hhbmdlLzEuMCJdLCAibGFiZWwiOiAiQWxpY2UiLCAic2VydmljZSI6IFt7ImlkIjogIiNpbmxpbmUiLCAidHlwZSI6ICJkaWQtY29tbXVuaWNhdGlvbiIsICJyZWNpcGllbnRLZXlzIjogWyJkaWQ6a2V5Ono2TWtteWJpMnJKNjZ1WmJzSG5rSlpRQUVaMXNxd21IdG01dkVjaGdwYlNvUzZhayJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHA6Ly8xOTIuMTY4LjQzLjIwMTo4MDAwLyJ9XX0='
  );

  setupConnectionListener(agent, outOfBandRecord, () =>
    console.log(
      'We now have an active connection to use in the following tutorials',
    ),
  );
  console.log('end');
};

initializeHolderAgent()

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
