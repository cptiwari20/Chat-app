var socket = io();

socket.on('connect', function(){   
   console.log('Connected to the server!!')
});
socket.on('disconnect', function(){
    console.log("Disconnected to the server!!")
});
socket.on('newMessage', function(message){
    var getTime = moment(message.createdAt).format('hh:mm a')
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${getTime}: ${message.text}`);
    jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    var getTime = moment(message.createdAt).format('hh:mm a')

    li.text(`${message.from} ${getTime}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
    
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var textBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: textBox.val()
    }, function() {
        textBox.val('')
    });
});
var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Sorry! Your browser do not support GeoLocation.')
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition(function(Position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
        }); 
        }, function(){
            locationButton.removeAttr('disabled').text('Send Location');
            return alert('Unable to fetch Location Data!!')
    });
});

