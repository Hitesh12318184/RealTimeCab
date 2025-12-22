import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '@/context/AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
            const newSocket = io(SOCKET_URL, {
                transports: ['websocket'],
                reconnection: true,
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);

                // Join user-specific room
                if (user.role === 'admin') {
                    newSocket.emit('join-admin');
                } else {
                    newSocket.emit('join', user._id);
                }
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [isAuthenticated, user]);

    const value = {
        socket,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
