const express               = require('express');
const path                  = require('path');
const socketIO              = require('socket.io');
const http                  = require('http');
var {
  generateMessage,
  generateLocationMessage}  = require('./utils/message')

var app                     = express();
var server                  = http.createServer(app);
var io                      = socketIO(server);
var publicPath              = path.join(__dirname, "../public");
var Port                    = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat room XYZ!!"));
    socket.broadcast.emit("newMessage", generateMessage('Admin', "A new user connected to the chat room!"))


    socket.on('createMessage', (message, callback) =>{
        console.log("Get a new Message From the client:", message)
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This message ha reached to the server successfully")
        // socket.broadcast.emit('newMessage', {
        //        from: message.from,
        //        text: message.text,
        //        createdAt: new Date().getTime()})
    })
    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function(){
        console.log('User get disconnected!')
    });

})

server.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

