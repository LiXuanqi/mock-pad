// let redisClient = require("../utils/redisClient");

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.handshake.query['sessionId']);
  });
}