import { io } from 'socket.io-client';

const socket = io('https://livechat-1-0m1q.onrender.com', {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;