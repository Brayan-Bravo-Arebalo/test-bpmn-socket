import express from "express";
import { Server as socketIO } from "socket.io";
import http from "node:http"
import cors from "cors";

const app = express()
const server = http.createServer(app)
const options = {
  cors: true,
  origins: ["*"],
}
const io = new socketIO(server, options)




io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('join-room', (room) => {
    const roomName = `sala-${room}`
    socket.join(roomName);
    console.log(`Cliente unido a la sala ${room}`);
  });

  socket.on('leave-room', (room) => {
    const roomName = `sala-${room}`;
    socket.leave(roomName);
    console.log(`Cliente salió de la sala ${roomName}`);
  });

  socket.on('bpmn-update', ({ room, xml }) => {
    const roomName = `sala-${room}`
    io.to(roomName).emit('bpmn-update', { xml })
  });


  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});




app.use(cors())
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${port}`);
});