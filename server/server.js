const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

var publicPath = path.join(__dirname, '../public') // just go to public directory
const port = process.env.PORT || 3000; // Heroku or Localhost deployemnt

var app = express();
var server = http.createServer(app); // create server for sockets
var io = socket(server); // add socket

app.use(express.static(publicPath)); // add index static files 

io.on('connection', (socket) => {
	console.log("new user connected");

	socket.emit('newMessage', {
		from: "Admin",
		text: "Welcome to the chat app"
	})

	// get event all except one
	socket.broadcast.emit('newMessage', {
		from: "Admin",
		text: "New user joined",
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', (message) => {
		console.log('Message:message', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
		/*
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		}) */
	});


	socket.on('disconnect', () => {
		console.log("user was disconnected");
	});

});
 
server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});