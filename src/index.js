const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
// npm library that filters out use of bad language in chat app
const Filter = require("bad-words")
const app = express();
// Enables creating a new web server
const server = http.createServer(app);
// Configures web sockets to work with server-> function enables us to configure socketio
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// Message for when a client connects to server-> fires whenever socket io gets another connection
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
      `https://google.com/maps?q=: ${coordinates.latitude},${coordinates.longitude}`
    );
    callback()
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat room.");
  });
});
// Fires up http server
server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
