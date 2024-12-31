import { Server } from 'socket.io';
import { handleUserConnection } from '../services/socketService.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', handleUserConnection);
  
  return io;
};