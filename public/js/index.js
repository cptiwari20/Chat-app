var socket = io();

socket.on('connect', function(){   
   console.log('Connected to the server!!')

 
});

socket.on('newMessage', function(message){
    console.log('Get a New Message', message)
})

socket.on('disconnect', function(){
    console.log("Disconnected to the server!!")
});