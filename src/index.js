const path = require('path')
const http = require('http');
const express = require('express');
const socketio= require('socket.io');

const app= express();
// Enables creating a new web server
const server = http.createServer(app);
// Configures web sockets to work with server-> function enables us to configure socketio
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));


// Message for when a client connects to server-> fires whenever socket io gets another connection
io.on('connection', () => {
    console.log('New web socket connection.');
})
// Fires up http server
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})