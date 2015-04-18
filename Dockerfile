FROM node:0.12.2
ADD . /opt/server
WORKDIR /opt/server
RUN npm install
ENTRYPOINT ["/usr/local/bin/node"]
CMD ["server.js"]
