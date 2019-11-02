# chat-app-socket.io

## Description
This project was a passion project that was motivated by a group project. Cosmo Chat is a Socket.io powered chat app, written in Node.js that allows users to chat in real-time. MongoDb handles data storage and the styling was done with CSS. 

## Libraries Used
- Socket.io, 
- Node.js,
- Bad-words- Makes app more user friendly accross a broader demographic by fltering out the use of inappropriate language.
- Mustache- renders HTML templates.
- Moment- Used to manipulate time and show the time a message was sent in real time.
- Qs- Responsible for creating room names and user names.

## Features
- Ability to share location with other users
- Profanity filter to keep language PG.

## Possible Future Features
1. Let users pick from a drop down list of active chat rooms with other users from signin. 
2. Authentication with Passport
- User login screen
3. Needs further styling (Cosmo themed)

## Demo
Project can be viewed by clicking on the following link: https://aqueous-chamber-75752.herokuapp.com/

## Installation
To run the application locally, first clone this repository with the following command.
``` txt
1. git clone git@github.com:andrewjthomsen/Cosmo-Chat.git
Next, install the application dependencies.
 ```
```txt
2. cd cosmo-chat
3. npm install
```

Finally, run the node server locally.
```txt
4. npm run dev
```
node server
Now, open the local application on port 8080 at the URL: http://localhost:3000/.
