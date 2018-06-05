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
        from: "Admin",
        text: "Welcome to the Chat room!",
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "A new user connected!!",
        createdAt: new Date().getTime()
    })


    socket.on('createMessage', (message) =>{
        console.log("Get a new Message From the client:", message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage', {
        //        from: message.from,
        //        text: message.text,
        //        createdAt: new Date().getTime()})
    })

    socket.on('disconnect', function(){
        console.log('User get disconnected!')
    });

})

server.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

