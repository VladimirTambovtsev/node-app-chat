var socket = io(); // create connection

socket.on('connect', function() { 		// using regular func for working on mobile browsers
	console.log("connected to server");
});

socket.emit('createMessage', {
	from: "Andrew",
	to: "Vlad",
	text: "Hey, This is Andrew."
});

socket.on('disconnect', function() {
	console.log("disconnected from server");
});

socket.on('newMessage', function(message) {
	console.log("New message", message);
});

 