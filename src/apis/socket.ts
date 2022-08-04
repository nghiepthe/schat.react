import io, {Socket} from 'socket.io-client';

export const socket: Socket = io(process.env.HOST!);
socket.disconnect();
// export const SocketContext = React.createContext(socket);

// export const SocketProvider = SocketContext.Provider;
// export const SocketConsumer = SocketContext.Consumer;
