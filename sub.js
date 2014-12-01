var io = require('socket.io-client');
var host = 'http://192.168.59.103:8080';
var socket = io.connect(host);
socket.on('connect',  function() {
  socket.on('msg', function(msg) {
    console.log('msg:', msg);
  });
  socket.on('disconnect', function(msg){
    console.log('disconnect:', msg);
  });
  console.log('connect');
});
