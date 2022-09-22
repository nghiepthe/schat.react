import {
  Agent,
  AutoAcceptCredential,
  CredentialEventTypes,
  CredentialState,
  CredentialStateChangedEvent,
  HttpOutboundTransport,
  InitConfig,
  WsOutboundTransport,
} from '@aries-framework/core';
import {agentDependencies} from '@aries-framework/react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const setupCredentialListener = (holder: Agent) => {
  holder.events.on<CredentialStateChangedEvent>(
    CredentialEventTypes.CredentialStateChanged,
    async ({payload}) => {
      switch (payload.credentialRecord.state) {
        case CredentialState.OfferReceived:
          console.log('received a credential');
          // custom logic here
          await holder.credentials.acceptOffer({
            credentialRecordId: payload.credentialRecord.id,
          });
        case CredentialState.Done:
          console.log(
            `Credential for credential id ${payload.credentialRecord.id} is accepted`,
          );
      }
    },
  );
};

const getGenesisTransaction = async (url: string) => {
  const response = await fetch(url);
  return await response.text();
};

const initializeHolderAgent = async () => {
  const genesisTransactionsBCovrinTestNet = await getGenesisTransaction(
    'http://192.168.1.6:9000/genesis',
  );
  const config: InitConfig = {
    label: 'docs-rn-agent-99',
    walletConfig: {
      id: 'wallet99',
      key: 'testkey0000000000000000000000099',
    },
    indyLedgers: [
      {
        id: 'sandbox-agent-mobile',
        isProduction: false,
        genesisTransactions: genesisTransactionsBCovrinTestNet,
      },
    ],
    autoAcceptCredentials: AutoAcceptCredential.Always,
    autoAcceptConnections: true,
    // mediatorConnectionsInvite:
    //   'ws://192.168.1.6:8000?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYzdkYmE2NTQtNTFmMi00MWQ1LWIxZTQtZDRmZjQxMjA1MWJjIiwgImxhYmVsIjogIk1lZGlhdGlvbiIsICJzZXJ2aWNlRW5kcG9pbnQiOiAid3M6Ly8xOTIuMTY4LjEuNjo4MDAwIiwgInJlY2lwaWVudEtleXMiOiBbIkF5Nzl2Wnk4MkdYY3JBRzF1RmFmd1ViUVpITjJqZ01Ba0t4ZVBlNEUzY0VhIl19',
  };
  const agent = new Agent(config, agentDependencies);
  agent.registerOutboundTransport(new HttpOutboundTransport());
  agent.registerOutboundTransport(new WsOutboundTransport());
  await agent.initialize().catch(console.error);
  setupCredentialListener(agent);
  // await agent.oob.receiveInvitationFromUrl(
  //   'ws://192.168.1.6:3001?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiJkMDA0ZDQwYS0xYTQ0LTQ4NjUtYTY2Ni1iMzE1YTQ2Y2Y1ZGMiLCJsYWJlbCI6ImRlbW8tYWdlbnQtaXNzdWVyLTkiLCJhY2NlcHQiOlsiZGlkY29tbS9haXAxIiwiZGlkY29tbS9haXAyO2Vudj1yZmMxOSJdLCJoYW5kc2hha2VfcHJvdG9jb2xzIjpbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIiwiaHR0cHM6Ly9kaWRjb21tLm9yZy9jb25uZWN0aW9ucy8xLjAiXSwic2VydmljZXMiOlt7ImlkIjoiI2lubGluZS0wIiwic2VydmljZUVuZHBvaW50Ijoid3M6Ly8xOTIuMTY4LjEuNjozMDAxIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtpYkF4UHNEa05yZTdHVjJGaUhtTDRkNnVpRXVSTm9iWWo3eEdaRnJCaEx0SyJdLCJyb3V0aW5nS2V5cyI6W119XX0',
  // );
  console.log(await agent.credentials.getAll());
};

export const Agency = () => {
  return (
    <>
      <Button
        onPress={() => {
          void initializeHolderAgent();
        }}>
        Click me
      </Button>
    </>
  );
};
