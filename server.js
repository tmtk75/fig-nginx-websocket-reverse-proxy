var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));  
  console.log("GET");
}).listen(3000);

console.log("will start.");


var io = require('socket.io').listen(app);

// - http://stackoverflow.com/questions/24499306/how-to-set-redisstore-node-express-socket-io-heroku
// - http://qiita.com/nariyu/items/1c17dd567f866c698481
var redis = require('socket.io-redis');
var url = process.env.REDIS_URL || "redis:6379"
io.adapter(redis(url));


io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
    console.log("msg", data);
  });
});
