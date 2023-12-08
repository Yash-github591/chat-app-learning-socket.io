const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// socket.io

io.on("connection", (socket) => {
  // in socket.io, a client is referred to as a socket
  console.log("a new user has connected ", socket.id);
  socket.on("user-message", (message) => {
    // console.log("A new user Message", message);
    io.emit("message", { message, id: socket.id });
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => {
  console.log("server has started at port 9000");
});
