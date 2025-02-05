import { io } from 'socket.io-client';

const socket = io(
  'ws://localhost:3001',
  {
    path: '/ws',
    transports: ['websocket'],
  }
);

export default socket;