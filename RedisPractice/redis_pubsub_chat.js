/* redis_pubsub_chat.js */

var net   = require("net");
var redis = require("redis");

var server = net.createServer(function(socket) {
	var subscriber = redis.createClient();
	var publisher = redis.createClient();
	
	subscriber.subscribe("main_chat_room");

	subscriber.on("message", function(channel, message) {
		socket.write("Channel " + channel + ': ' + message);
	});
	
	socket.on('data', function(data) {
		publisher.publish('main_chat_room', data);
	});

	socket.on('end', function() {
		subscriber.unsubscribe('main_chat_room');
		subscriber.end();
		publisher.end();
	});
});

server.listen(3000);
