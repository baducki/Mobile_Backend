/* set.js */

var redis  = require("redis"),
	client = redis.createClient();

var SET_SIZE = 20;

client.sadd("bigset", "a member");
client.sadd("bigset", "another member");

while(SET_SIZE > 0) {
	client.sadd("bigset", "member" + SET_SIZE);
	SET_SIZE--;
}

client.multi().scard("bigset").smembers("bigset").keys("*", function(err, replies) {
	client.mget(replies, redis.print);
}).dbsize().exec(function(err, replies) {
	console.log("MULTI got " + replies.length + " replies");
	replies.forEach(function (reply, index) {
		console.log("Reply " + index + ": " + reply.toString());
	});
});
