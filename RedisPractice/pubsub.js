/* pubsub.js */

var redis = require("redis"),
	subscriber1 = redis.createClient(),
	subscriber2 = redis.createClient(),
	publisher  = redis.createClient();

subscriber1.on("message", function(channel, message) {
	console.log("Message : " + message + "on channel : " + channel + " arrived!");
});

subscriber2.on("message", function(channel, message) {
	console.log("Message : " + message + "on channel : " + channel + " arrived!");
});

subscriber1.subscribe("test");
subscriber2.subscribe("test");

publisher.publish("test", "haaaaai");
publisher.publish("test", "kthxbai");