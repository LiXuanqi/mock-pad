// let redisClient = require("../utils/redisClient");

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
  io.on('connection', function(socket){
    console.log('a user connected');
  });
}