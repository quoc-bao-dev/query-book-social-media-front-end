'use client';

import { config } from '@/config';
import { useAuth } from '@/store/authSignal';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
};

const massageSocket = createContext<SocketContextType>({ socket: null });
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const {user} = useAuth()
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        if (!user) return;
        const socketInstance = io(config.MESSAGE_SOCKET_URL, {
            query: {
                userId: user.id,
            }
        });
        socketInstance.on('connect', () => {
            setSocket(socketInstance);
            console.log('connected', socketInstance.id);
        });

        return () => {
            socketInstance.disconnect();
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
