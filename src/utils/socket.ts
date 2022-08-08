import EncryptedStorage from 'react-native-encrypted-storage';
import {createContext} from 'react';
import {io, Socket} from 'socket.io-client';

export const socket: Socket = io(process.env.HOST!);
socket.disconnect();
export const SocketContext = createContext(socket);

export const onReconnect = signature => {
  socket.auth = cb => cb({token: signature});
  socket.disconnect().connect();
};
