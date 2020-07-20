const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected !");

  socket.on("chatting", (message) => {
    console.log(message);
    io.emit("chatting", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`running on http://localhost:${port}`));
