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
import {Button} from 'react-native';

export const Agency = () => {
  return (
    <Button
      title="CLICK ME"
      onPress={async () => {
        const getGenesisTransaction = async (url: string) => {
          const response = await fetch(url);
          return await response.text();
        };
        const genesisTransactionsBCovrinTestNet = await getGenesisTransaction(
          'http://192.168.1.6:9000/genesis',
        );

        const config: InitConfig = {
          label: 'schat-agent-0001',
          walletConfig: {
            id: 'schat-wallet-0001',
            key: 'testkey0000000000000000000000099',
          },
          indyLedgers: [
            {
              id: 'schat-ledger-0001',
              isProduction: false,
              genesisTransactions: genesisTransactionsBCovrinTestNet,
            },
          ],
          autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
          autoAcceptConnections: true,
        };
        const agent = new Agent(config, agentDependencies);
        agent.registerOutboundTransport(new HttpOutboundTransport());
        agent.registerOutboundTransport(new WsOutboundTransport());
        await agent.initialize().catch(console.log);

        agent.events.on<CredentialStateChangedEvent>(
          CredentialEventTypes.CredentialStateChanged,
          async ({payload}) => {
            console.log('vao day');

            switch (payload.credentialRecord.state) {
              case CredentialState.OfferReceived:
                console.log('received a credential');
                await agent.credentials.acceptOffer({
                  credentialRecordId: payload.credentialRecord.id,
                });

              case CredentialState.Done:
                console.log(
                  `Credential for credential id ${payload.credentialRecord.id} is accepted`,
                );
                console.log(await agent.credentials.getAll());
            }
          },
        );

        agent.oob.receiveInvitationFromUrl(
          'ws://192.168.1.6:3001?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiJjYTFjMmYyOC1iZTQ4LTQ2MGMtODFkNi01OTgxMzBiNmU2MDYiLCJsYWJlbCI6ImRlbW8tYWdlbnQtaXNzdWVyLTExMSIsImFjY2VwdCI6WyJkaWRjb21tL2FpcDEiLCJkaWRjb21tL2FpcDI7ZW52PXJmYzE5Il0sImhhbmRzaGFrZV9wcm90b2NvbHMiOlsiaHR0cHM6Ly9kaWRjb21tLm9yZy9kaWRleGNoYW5nZS8xLjAiLCJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMCJdLCJzZXJ2aWNlcyI6W3siaWQiOiIjaW5saW5lLTAiLCJzZXJ2aWNlRW5kcG9pbnQiOiJ3czovLzE5Mi4xNjguMS42OjMwMDEiLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa3VMblJwRTlLSHYxNXdBRkVFb3VTSHpzdFdqVHoyQXhTMjRGaDZCS1ZrbmM2Il0sInJvdXRpbmdLZXlzIjpbXX1dfQ',
        );
      }}></Button>
  );
};
