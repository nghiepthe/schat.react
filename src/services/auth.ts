import { wrapper, agent } from '@utils';
import { CredentialEventTypes, CredentialState, CredentialStateChangedEvent } from '@aries-framework/core';

const connect = async ({ invitationUrl }) => {
  agent.events.on<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged, async ({ payload }) => {
    switch (payload.credentialRecord.state) {
      case CredentialState.OfferReceived:
        console.log('received a credential')
        await agent.credentials.acceptOffer({ credentialRecordId: payload.credentialRecord.id })
        break;
      case CredentialState.Done:
        console.log(`Credential for credential id ${payload.credentialRecord.id} is accepted`)
        break;
    }
  })

  agent.oob.receiveInvitationFromUrl(invitationUrl);

};

export const Connect = wrapper(connect);