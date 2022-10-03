import { agent, wrapper } from '@utils';

const connect = async ({ invitationUrl }) => {
  agent.oob.receiveInvitationFromUrl(invitationUrl);
};

export const Connect = wrapper(connect);