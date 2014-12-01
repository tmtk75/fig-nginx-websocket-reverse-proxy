var io = require('socket.io-client');
var socket = io.connect('http://192.168.59.103:8080');
socket.on('connect', function() {
  socket.emit("msg", process.argv[2] || "hello");
  socket.close();
});

