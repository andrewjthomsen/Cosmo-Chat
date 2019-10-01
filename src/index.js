// // Server
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')  // filters out use of bad language in chat app
const { generateMessage, generateLocationMessage } = require('./utils/messages') // Responsible for message generation
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const app = express()
const server = http.createServer(app) // Enables creating a new web server
const io = socketio(server) // Configures web sockets to work with server

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

// Event listener for joining a chat room/ tracking a user
socket.on('join', ({ username, room}, callback) => {
    // Adds user to users array
    const { error, user } = addUser({ id: socket.id, username, room })
    if (error) {
       return callback(error)
    }

     socket.join(user.room) // Responsible for allowing the join to occur/name of room

    socket.emit('message', generateMessage('Welcome!'))
        // socket.broadcast.to.emit- Sends event to everyone except client. Limited to a specific chatroom. 
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the chat room!`))
    callback()
})

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to('Center City').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)// Will either return removed user as an obj or undefined if no user was removed.

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left.`))
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})