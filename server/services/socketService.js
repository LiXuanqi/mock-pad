let redisClient = require("../utils/redisClient");

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {

  let sessionPool = [];

  let sessionPath = "/temp_sessions";

  io.on('connection', (socket) => {
    let sessionId = socket.handshake.query['sessionId']
    console.log(`a user(${socket.id}) connected, sessionId: ${sessionId}`);
    if (sessionId in sessionPool) {
      // add a new user to a existed session.
      sessionPool[sessionId]['participants'].push(socket.id);
    } else {
      // find in redis
      redisClient.get(`sessionPath/${sessionId}`, data => {
        if (data) {
          console.log("session terminated previously; pulling back from Redis");
          sessionPool[sessionId] = {
            cachedChangeEvents: JSON.parse(data),
            participants: []
          }
        } else {
          // there is no old data in redis, create a new session.
          console.log("create new session")
          sessionPool[sessionId] = {
            cachedChangeEvents: [],
            participants: []
          }
        }
        sessionPool[sessionId]['participants'].push(socket.id);
      });
    
    }

    // handle change Event from Client
    socket.on("change", delta => {
      console.log(`change from client: ${socket.id} ${delta}`);
      if (sessionId in sessionPool) {
        sessionPool[sessionId]['cachedChangeEvents'].push({
          changeName: "change",
          data: delta,
          time: Date.now()
        });
      }
      forwardEvents(socket.id, sessionId, 'change', delta);
    });

    // handle cursor move Event from Client.
    socket.on("cursorMove", cursor => {
      console.log(`cursorMove from client: ${socket.id} ${cursor}`);
      cursor = JSON.parse(cursor);
      // add attribute to mark the owner of cursor.
      cursor['socketId'] = socket.id;

      forwardEvents(socket.id, sessionId, 'cursorMove', JSON.stringify(cursor));
    });

    // if there is no user in the session, store the data into redis.
    socket.on("disconnect", () => {
      console.log(`user(${socket.id}) disconnected from ${sessionId}.`);
      if (sessionId in sessionPool) {
        let participants = sessionPool[sessionId]['participants'];
        let index = participants.indexOf(socket.id);
        if (index >= 0) {
          participants.splice(index, 1);
          // no user in this session
          if (participants.length == 0) {
            console.log("last participant left. Storing in Redis.");
            let key = sessionPath + "/" + sessionId;
            let value = JSON.stringify(sessionPool[sessionId]['cachedChangeEvents']);
            redisClient.set(key, value, redisClient.redisPrint);
            redisClient.expire(key, TIMEOUT_IN_SECONDS);
            delete sessionPool[sessionId];
          }
        }
      }
    });
    
    // when user enter a existed session, restore all changes to the user.
    socket.on("restoreBuffer", () => {
      console.log(`restoring buffer for session: ${sessionId}, socket: ${socket.id}`);
      if (sessionId in sessionPool) {
        let changeEvents = sessionPool[sessionId]['cachedChangeEvents'];
        for (let i = 0; i < changeEvents.length; i++) {
          socket.emit(changeEvents[i]['changeName'], changeEvents[i]['data']);
        }
      }
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