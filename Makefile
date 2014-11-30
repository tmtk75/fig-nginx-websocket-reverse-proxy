## Server
run: modules
	REDIS_URL=localhost:6379 \
	  node server.js

pm2: modules
	REDIS_URL=localhost:6379 \
    pm2 start server.js --name server -i max

modules: node_modules/socket.io

pm2del:
	pm2 delete server

## Redis
redis-cli:
	redis-cli -h `boot2docker ip 2>/dev/null`

## Browser
open:
	open http://`boot2docker ip`:8080
