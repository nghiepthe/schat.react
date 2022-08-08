import {onSignin, onSignout} from '@store/auth.slice';
import {useAppDispatch} from '@store/hooks';
import {socket} from '@utils';
import {SocketContext} from '@utils/socket';
import React, {PropsWithChildren, useEffect} from 'react';

export const AppSocket: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch();
  const onSocketConnect = () => dispatch(onSignin());
  const onSocketDisconnect = () => dispatch(onSignout());

  useEffect(() => {
    socket.on('connection', onSocketConnect);
    socket.on('disconnect', onSocketDisconnect);
    return () => {
      socket.off('connection', onSocketConnect);
      socket.off('disconnect', onSocketDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
