const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: process.env.NODE_ENV === "production" 
			? false 
			: [
				"http://localhost:5500", 
				"http://127.0.0.1:5500",
				"http://localhost:3000", 
				"http://127.0.0.1:3000",
			],
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

httpServer.listen(3000, () => {
	console.log("listening on port 3000")
});