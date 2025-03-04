const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);

// Configura CORS
app.use(cors({
  origin: 'https://chat-app-chi-pearl-14.vercel.app/', // Permite solicitudes desde este origen
  methods: ['GET', 'POST'], // Métodos permitidos
}));

const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-chi-pearl-14.vercel.app/', // Permite conexiones WebSocket desde este origen
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Mensaje recibido:', message);
    io.emit('newMessage', message); // Reenviar el mensaje a todos los clientes test
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 10000; // Usa el puerto de Render o 10000 localmente
server.listen(PORT, () => {
  console.log(`Servidor de WebSockets escuchando en el puerto ${PORT}`);
});