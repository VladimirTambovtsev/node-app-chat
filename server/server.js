const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
var publicPath = path.join(__dirname, '../public') // just go to public directory
const port = process.env.PORT || 3000; // Heroku or Localhost deployemnt

var app = express();
var server = http.createServer(app); // create server for sockets
var io = socket(server); // add socket

app.use(express.static(publicPath)); // add index static files 

io.on('connection', (socket) => {
	console.log("new user connected");

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


	socket.on('createMessage', (message, callback) => {
		console.log('Message:message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});


	socket.on('disconnect', () => {
		console.log("user was disconnected");
	});

});
 
server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});