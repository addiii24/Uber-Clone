import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// ✅ IMPORTANT: DO NOT USE /api
const socket = io("http://localhost:3000", {
    transports: ["websocket"], // 🔥 force websocket only
    withCredentials: false,    // 🔥 match backend "*"
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
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;