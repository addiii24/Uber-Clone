import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// ✅ IMPORTANT: DO NOT USE /api — socket connects to root URL only
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
const socket = io(SOCKET_URL, {
    transports: ["polling", "websocket"], // ✅ allow fallback
});

const SocketProvider = ({ children }) => {

    useEffect(() => {

        socket.on('connect', () => {
            console.log('✅ Connected:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('❌ Disconnected:', reason);
        });

        socket.on('connect_error', (err) => {
            console.log('🚨 Connection Error:', err.message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;