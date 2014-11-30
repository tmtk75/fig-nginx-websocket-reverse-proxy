run: modules
	REDIS_URL=localhost:6379 \
	  node server.js

pm2: modules
	REDIS_URL=localhost:6379 \
    pm2 start server.js --name server -i max

pm2del:
	pm2 delete server

monitor:
	redis-cli -h `boot2docker ip 2>/dev/null` monitor

modules: node_modules/socket.io

open:
	open http://`boot2docker ip`:8080
