const socket = new io('ws://localhost:3000');

function sendMessage(e) {
	e.preventDefault();
	const input = document.querySelector('input');
	const { value } = input;
	if (value) {
		// emit a message
		socket.emit('message', value);
		input.value = '';
	}
	input.focus();
}

document.querySelector('form')
		.addEventListener('submit', sendMessage);

// listen for messages from the server
socket.on("message", ( data ) => {
	const li = document.createElement('li');
	li.textContent = data;
	document.querySelector('ul').appendChild(li);
})