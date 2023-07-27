import express from "express";
import  {Server as socketIO } from "socket.io";
import http from "node:http"
import cors from "cors";
import { assert } from "node:console";

const app = express()
const server = http.createServer(app)
const options ={
  cors:true,
  origins:["*"],
 }
const io = new socketIO(server,options)

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejar evento para recibir cambios desde el cliente BPMN.io
  socket.on('bpmn-update', (data) => {
    // Aquí podrías agregar lógica para validar los cambios y manejar conflictos
    // Luego, retransmite los cambios a todos los demás clientes conectados.
    socket.broadcast.emit('bpmn-update', data);
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