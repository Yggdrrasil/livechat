const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes desde este origen
  methods: ['GET', 'POST'], // Métodos permitidos
}));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Permite conexiones WebSocket desde este origen
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

server.listen(10000, () => {
  console.log('Servidor de WebSockets escuchando en el puerto 10000');
});