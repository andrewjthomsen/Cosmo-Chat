# chat-app-socket.io

## Description
Welcome to Cosmo Chat! This project is a Socket.io powered chat app that allows users to chat in real-time. I built this project because I wanted to learn more about Socket.io, which I was first introduced to during a group project during my full-stack dev bootcamp at UCSD. This application's backend was built with Node.js and the front-end was built with Mustache and CSS. The styling isn't this project's shining feature, because I wanted to put more focus on it's backend. The Goal of this project was to work on further developing my Node.js understanding as well as refresh my understanding of Socket.io. I plan to work more with Socket.io in the future and plan to build more apps as I continue learning.

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
