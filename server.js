var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));  
  console.log("GET", req.url);
}).listen(3000);

console.log("will start.");


var io = require('socket.io').listen(app);

// - http://stackoverflow.com/questions/24499306/how-to-set-redisstore-node-express-socket-io-heroku
// - http://qiita.com/nariyu/items/1c17dd567f866c698481
var redisAdapter = require('socket.io-redis');
var redis = require('redis');
var url = process.env.REDIS_URL
if (url) {
  io.adapter(redisAdapter(url));
  console.log("url", url);
} else {
  var pub = redis.createClient(6379, "redismaster" /* host */);
  var sub = redis.createClient(6379, "redisslave" /* host */, {detect_buffers: true});
  var opts = {pubClient:pub, subClient:sub}
  io.adapter(redisAdapter("redismaster:6379", opts));
  console.log("on fig");
}


io.on('connection', function(sock) {
  sock.on('msg', function(data) {
    io.emit('msg', data);
    console.log("msg", data);
  });
});
