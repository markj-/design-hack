var server = require('http').createServer();
var io = require('socket.io')(server);

var player;
var host;

function connectPlayer() {
	console.log('player connected');
	player = this;
}

function connectHost() {
	console.log('host connected');
	host = this;
}

io.on('connection', function(socket){
	socket.on('connectPlayer', connectPlayer);
	socket.on('connectHost', connectHost);

	socket.on('next', function() {
		console.log('next');
		player.emit('next');
	});

	socket.on('showImage', function() {
		console.log('show image');
		player.emit('showImage');
	});

	socket.on('correctAnswerReceived', function() {
		console.log('correct answer received');
		host.emit('correctAnswerReceived');
	});

	socket.on('questionStarted', function(data) {
		console.log('question started');
		host.emit('questionStarted', data);
	});
});

server.listen(3000);