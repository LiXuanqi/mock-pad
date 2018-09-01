let express = require("express");
let app = express();
let http = require("http");
let path = require("path");

let socketIo = require('socket.io');
let io = socketIo();
let socketService = require('./services/socketService')(io);
let indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, '../public')));

// handle refresh.
app.use((req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

// server config.
let server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr == 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listiening on ' + bind);
}