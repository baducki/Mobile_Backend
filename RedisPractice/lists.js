/* lists.js */

var redis  = require("redis");
var client = redis.createClient(6379, "127.0.0.1");

client.on("error", function(err) {
	console.log("error" + err);
});

client.lpush("tasks", "paint the bikeshed red", redis.print);
client.lpush("tasks", "paint the bikeshed green", redis.print);
client.lrange("tasks", 0, -1, function(err, items) {
	if (err) throw err;
	items.forEach(function(item, i) {
		console.log(i + ":" + item);
	});
});