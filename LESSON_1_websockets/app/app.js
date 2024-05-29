const socket = new WebSocket('ws://localhost:3000');

function sendMessage(e) {
	e.preventDefault();
	const input = document.querySelector('input');
	const { value } = input;
	if (value) {
		socket.send(value);
		input.value = '';
	}
	input.focus();
}

document.querySelector('form').addEventListener('submit', sendMessage);

// listen for lessages from the server
socket.addEventListener("message", ({ data }) => {
	const li = document.createElement('li');
	li.textContent = data;
	document.querySelector('ul').appendChild(li);
})