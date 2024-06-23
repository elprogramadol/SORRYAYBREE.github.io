const express = require('express');
const app = express();
const http = require('http').createServer(app);

let count = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

const io = require('socket.io')(http);

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