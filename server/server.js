var express = require("express");
var app = express();

let socketIo = require('socket.io');
let io = socketIo();
let socketService = require('./services/socketService')(io);

app.get('/', function (req, res) {
  res.send("Hello world!");
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})