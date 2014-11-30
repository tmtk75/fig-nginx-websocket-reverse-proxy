FROM node:0.10.33
ADD . /opt/server
WORKDIR /opt/server
RUN npm install
ENTRYPOINT ["/usr/local/bin/node"]
CMD ["server.js"]
