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

	socket.on('nextQuestion', function() {
		player.emit('nextQuestion');
	});

	socket.on('showImage', function() {
		player.emit('showImage');
	});

	socket.on('answerReceived', function() {
		host.emit('answerReceived');
	});
});

server.listen(3000);