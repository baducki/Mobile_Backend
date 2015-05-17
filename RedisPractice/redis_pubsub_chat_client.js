/* redis_pubsub_chat_client.js */

var net = require('net');
var client = net.connect({port: 3000}, function() {
	console.log('connected to server!');
});
client.on('data', function(data) {
	console.log(data.toString());
	client.end();
});

client.on('end', function() {
	console.log('disconnected from server');
});

client.write('Hello world\r\n');