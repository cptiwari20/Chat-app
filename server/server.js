const express = require('express');
const path    = require('path');
const socketIO = require('socket.io');
const http     = require('http');
var publicPath = path.join(__dirname, "../public");
var Port       = process.env.PORT || 3000;
var app        = express();
var server     = http.createServer(app);
var io         = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () =>{
        console.log('User get disconnected!')
    });
})

server.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

