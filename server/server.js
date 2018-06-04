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

io.on('connection', function(socket){
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: "vikas@example.com",
        text: "Hey! whats up",
        createdAt: new Date()
    });

    socket.on('createMessage', (newMessage) =>{
        console.log("Get a new Message From the client:", newMessage)
    })

    socket.on('disconnect', function(){
        console.log('User get disconnected!')
    });

})

server.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

