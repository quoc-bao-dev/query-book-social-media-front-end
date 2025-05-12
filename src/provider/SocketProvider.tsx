'use client';

import { config } from '@/config';
import { useAuth } from '@/store/authSignal';
import { createContext, useContext, useEffect, useState } from 'react';
import { signify } from 'react-signify';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket | null;
};

export const sSocket = signify<SocketContextType>({
  socket: null,
});

const massageSocket = createContext<SocketContextType>({ socket: null });
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    if (!user) return;
    const socketMessage = io(config.MESSAGE_SOCKET_URL, {
      query: {
        userId: user.id,
      },
    });
    socketMessage.on('connect', () => {
      setSocket(socketMessage);
    });

    const socketServer = io(config.SOCKET_URL, {
      query: {
        userId: user.id,
      },
    });

    socketServer.on('connect', () => {
      sSocket.set((n) => (n.value.socket = socketServer));
      console.log('[connected]', socketServer.id);
    });

    return () => {
      socketMessage.disconnect();
      socketServer.disconnect();
    };
  }, [user]);

  return (
    <massageSocket.Provider value={{ socket }}>
      {children}
    </massageSocket.Provider>
  );
};

export default SocketProvider;

export const useMessageSocket = () => {
  return useContext(massageSocket);
};
