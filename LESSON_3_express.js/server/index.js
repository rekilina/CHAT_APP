const { Server } = require('socket.io');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(port, () => {
	console.log(`listening on port ${port}`)
});

const io = new Server(expressServer, {
	cors: {
		// we don't need cors
		// as long as we serve static frontend files
		// on the server (in public folder)
	}
});


io.on('connection', socket => {
	const socketID = socket.id.slice(0, 5);
	console.log(`User connected ${socketID}`);

	socket.on('message', message => {
		console.log(message);
		// emit to everyone connected to server
		io.emit('message', `${socketID}: ${message}`);
	})
})
