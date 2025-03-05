const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);

// Configura CORS
app.use(cors({
  origin: 'https://chat-app-chi-pearl-14.vercel.app', // Permite solicitudes desde este origen
  methods: ['GET', 'POST'], // Métodos permitidos
}));

const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-chi-pearl-14.vercel.app', // Permite conexiones WebSocket desde este origen
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Escuchar el evento 'sendMessage'
  socket.on('sendMessage', (data) => {
    const { message, username } = data; // Recibe el mensaje y el nombre del usuario
    const timestamp = new Date().toLocaleTimeString(); // Añade la hora actual
    console.log(`Mensaje recibido de ${username} a las ${timestamp}:`, message);

    // Reenviar el mensaje, el nombre del usuario y la hora a todos los clientes
    io.emit('newMessage', { username, message, timestamp });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 10000; // Usa el puerto de Render o 10000 localmente
server.listen(PORT, () => {
  console.log(`Servidor de WebSockets escuchando en el puerto ${PORT}`);
});