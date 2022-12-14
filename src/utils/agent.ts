import {
    Agent,
    AutoAcceptCredential, AutoAcceptProof, ConnectionEventTypes, ConnectionRepository, ConnectionStateChangedEvent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, DidExchangeState, HttpOutboundTransport,
    InitConfig, ProofEventTypes,
    ProofState, ProofStateChangedEvent, WsOutboundTransport
} from '@aries-framework/core';
import { agentDependencies } from '@aries-framework/react-native';
import { createContext } from 'react';
import EncryptionStorage from 'react-native-encrypted-storage';
import { store, } from "@store";
import { onUpdateConnectionId } from "@store/auth.slice";

const initializeHolderAgent = () => {
    const config: InitConfig = {
        label: 'schat-agent-21',
        walletConfig: {
            id: 'schat-wallet-21',
            key: 'testkey0000000000000000000000099',
        },
        indyLedgers: [
            {
                id: 'schat-ledger-21',
                isProduction: false,
                genesisTransactions: `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"192.168.43.71","client_port":9702,"node_ip":"192.168.43.71","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
                {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"192.168.43.71","client_port":9704,"node_ip":"192.168.43.71","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
                {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"192.168.43.71","client_port":9706,"node_ip":"192.168.43.71","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
                {"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"192.168.43.71","client_port":9708,"node_ip":"192.168.43.71","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`,
            },
        ],
        autoAcceptConnections: true,
        autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
        autoAcceptProofs: AutoAcceptProof.ContentApproved,
        mediatorConnectionsInvite: "ws://192.168.1.6:8000/?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYWJiMGE4NWEtYzBhNC00Y2NhLWI1YWYtY2IwYjM5N2JkM2RlIiwgInJlY2lwaWVudEtleXMiOiBbIkR3YlJRV1Q3Q3ZDWG41akdSR0ZxSjJpMmI0aGJMQ2I1cXRab0hBMUZ3R2l1Il0sICJsYWJlbCI6ICJNZWRpYXRpb24iLCAic2VydmljZUVuZHBvaW50IjogIndzOi8vMTkyLjE2OC4xLjY6ODAwMC8ifQ=="
    };
    const agent = new Agent(config, agentDependencies);
    agent.registerOutboundTransport(new HttpOutboundTransport());
    agent.registerOutboundTransport(new WsOutboundTransport());
    return agent;
};

export const agent = initializeHolderAgent();
export const AgentContext = createContext(agent);

export const initializeAgent = async (agent: Agent, fn) => {
    // 2. get connectionId in device storage
    let neededEstablishConnection = true;
    const connectionId = await EncryptionStorage.getItem("connectionId");
    if (connectionId) {
        // 2.1 check if connectionId is ready and connected to server agent
        try {
            const con = await agent.connections.getById(connectionId);
            if (!con.isReady) throw new Error("Connection is not ready!");
            // 2.2 set state redux
            store.dispatch(onUpdateConnectionId(connectionId));
            neededEstablishConnection = false;
        } catch (error) {
            await EncryptionStorage.removeItem("connectionId");
        }
    }
    // 3. get new invitation and establish connection
    if (!neededEstablishConnection) return fn();

    const response = await fetch(
        'http://192.168.1.6:3000/agent/get-connection-invitation',
    );
    const invitationUrl = await response.text();
    console.log(invitationUrl);
    const conRes = agent.injectionContainer.resolve(ConnectionRepository);
    const { outOfBandRecord, connectionRecord } = await agent.oob.receiveInvitationFromUrl(invitationUrl);
    connectionRecord?.setTag("needUpdatingReduxAndDeviceStorage", true)
    connectionRecord && await conRes.update(connectionRecord);
};

export const setupListener = (agent: Agent, fn) => {

    agent.events.on<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged, async ({ payload }) => {
        switch (payload.connectionRecord.state) {
            case DidExchangeState.Abandoned:
                console.log(`${payload.connectionRecord.id} was abandoned!`);
        }
        if (payload.connectionRecord.state === DidExchangeState.Completed) {
            const needUpdatingReduxAndDeviceStorage = payload.connectionRecord.getTag("needUpdatingReduxAndDeviceStorage");
            console.log(JSON.stringify(payload.connectionRecord));
            console.log("Completed", needUpdatingReduxAndDeviceStorage);

            if (needUpdatingReduxAndDeviceStorage) {
                store.dispatch(onUpdateConnectionId(payload.connectionRecord.id));
                await EncryptionStorage.setItem("connectionId", payload.connectionRecord.id);
                fn();
            }
        }
    });

    agent.events.on<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged, async ({ payload }) => {
        switch (payload.credentialRecord.state) {
            case CredentialState.OfferReceived:
                await agent.credentials.acceptOffer({ credentialRecordId: payload.credentialRecord.id });
                break;
            case CredentialState.CredentialReceived:
            //agent.connections.deleteById(payload.credentialRecord.connectionId!);
        }
    });

    agent.events.on<ProofStateChangedEvent>(
        ProofEventTypes.ProofStateChanged,
        async ({ payload }) => {
            switch (payload.proofRecord.state) {
                case ProofState.PresentationSent:
                    break;
                case ProofState.RequestReceived:
                    console.log('received a proof request');
                    const retrievedCredentials =
                        await agent.proofs.getRequestedCredentialsForProofRequest(
                            payload.proofRecord.id,
                            {
                                filterByPresentationPreview: true,
                            },
                        );
                    const requestedCredentials =
                        agent.proofs.autoSelectCredentialsForProofRequest(
                            retrievedCredentials,
                        );
                    await agent.proofs.acceptRequest(
                        payload.proofRecord.id,
                        requestedCredentials,
                    );
                    break;
                case ProofState.Done:
                    console.log('Done presentation proof');
                    break;
            }
        },
    );
};

