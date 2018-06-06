var socket = io();

socket.on('connect', function(){   
   console.log('Connected to the server!!')
});
socket.on('disconnect', function(){
    console.log("Disconnected to the server!!")
});
socket.on('newMessage', function(message){
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
    
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});
var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Sorry! Your browser do not support GeoLocation.')
    }
    navigator.geolocation.getCurrentPosition(function(Position){
        socket.emit('createLocationMessage', {
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
        }), function(){
            return alert('Unable to fetch Location Data!!')
        }
    });
});

