const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words"); // filters out use of bad language in chat app

const app = express();
const server = http.createServer(app); // Enables creating a new web server
const io = socketio(server); // Configures web sockets to work with server

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


io.on("connection", socket => {
  console.log("New web socket connection.");

  socket.emit("message", "Welcome new user!");
  socket.broadcast.emit("message", "A new user has joined the chat room!");
 
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback({warning: "Profanity isn't allowed in chatroom!"})
    }

    io.emit("message", message);
    callback("Delivered...")
  });

  socket.on("sendLocation", (coordinates, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=: ${coordinates.latitude},${coordinates.longitude}`);
    callback()
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat room.");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});