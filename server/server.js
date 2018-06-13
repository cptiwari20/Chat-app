const express               = require('express');
const path                  = require('path');
const socketIO              = require('socket.io');
const http                  = require('http');
var {
  generateMessage,
  generateLocationMessage}  = require('./utils/message');
var {isRealString}          = require('./utils/validator');
var {Users}                 = require('./utils/users');

var app                     = express();
var server                  = http.createServer(app);
var io                      = socketIO(server);
var publicPath              = path.join(__dirname, "../public");
var Port                    = process.env.PORT || 3000;

var users                   = new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('New User Connected');
    //Join listener
    socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
       return callback('Name and Room name required!!')
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    //newMsg Emitter
    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat room " + params.name + "!!" ));
    socket.broadcast.to(params.room).emit("newMessage", generateMessage('Admin', `${params.name} connected to the chat room!`))
    callback();
})

    socket.on('createMessage', (message, callback) =>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
         io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
       
        callback("This message has reached to the server successfully")
        // socket.broadcast.emit('newMessage', {
        //        from: message.from,
        //        text: message.text,
        //        createdAt: new Date().getTime()})
    })
    socket.on('createLocationMessage', (coords) =>{
        var user = users.getUser(socket.id);
        if(user){
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', function(){
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room!`));            
        }
    });

})

server.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

