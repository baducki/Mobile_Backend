/* hashes.js */

var redis = require("redis");
var client = redis.createClient(6379, "127.0.0.1");

client.on("error", function(err) {
	console.log("error" + err);
});

client.hmset("camping", {
	"selter"  : "2-person tent",
	"cooking" : "campstove" }, redis.print);

client.hget("camping", "cooking", function(err, value) {
	if (err) throw err;
	console.log("Will be cooking with : " + value);
});

client.hkeys("camping", function(err, keys) {
	if (err) throw err;
	keys.forEach(function(key, i) {
		console.log(i + ":" + key);
	});
});
