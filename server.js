const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let count = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    count++;
    io.emit('updateCount', count);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
        count--;
        io.emit('updateCount', count);
    });
});
