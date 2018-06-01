const express = require('express');
const path    = require('path');
var publicPath = path.join(__dirname, "../public");
var Port       = process.env.PORT || 3000;
var app        = express();

app.use(express.static(publicPath));

app.listen(Port, (req, res)=> {
    console.log('Server has been started; i.e.', Port);
});

