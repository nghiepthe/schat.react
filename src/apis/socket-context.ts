import React from 'react';
import io, {Socket} from 'socket.io-client';

export const socket: Socket = io(process.env.HOST!);
export const SocketContext = React.createContext(socket);

export const SocketProvider = SocketContext.Provider;
export const SocketConsumer = SocketContext.Consumer;
