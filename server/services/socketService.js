// let redisClient = require("../utils/redisClient");

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {

  let sessionPool = [];

  io.on('connection', (socket) => {
    let sessionId = socket.handshake.query['sessionId']
    console.log(`a user(${socket.id}) connected, sessionId: ${sessionId}`);
    if (sessionId in sessionPool) {
      // add a new user to a existed session.
      sessionPool[sessionId]['participants'].push(socket.id);
    } else {
      // find in redis

      // there is no old data in redis, create a new session.
      sessionPool[sessionId] = {
        cachedChangeEvents: [],
        participants: []
      }
      sessionPool[sessionId]['participants'].push(socket.id);
    }

    // handle change Event from Client
    socket.on("change", delta => {
      console.log(`change from client: ${socket.id} ${delta}`);
      if (sessionId in sessionPool) {
        sessionPool[sessionId]['cachedChangeEvents'].push(["change", delta, Date.now()]);
      }

      forwardEvents(socket.id, sessionId, 'change', delta);
    });
  });

  function forwardEvents(socketId, sessionId, eventName, data) {
    if (sessionId in sessionPool) {
      let participants = sessionPool[sessionId]['participants'];
      for (let i = 0; i < participants.length; i++) {
        // avoid to emit to self.
        if (socketId != participants[i]) {
          io.to(participants[i]).emit(eventName, data);
        }
      }
    }
  }
}