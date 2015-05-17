/* sorts.js */

var rc = require("redis").createClient();
var _  = require("underscore");

rc.zincrby("myset", 1, "usera");
rc.zincrby("myset", 5, "userb");
rc.zincrby("myset", 3, "userc");
rc.zrevrange("myset", 0, -1, "withscores", function(err, members) {
	var lists = _.groupBy(members, function(a,b) {
		return Math.floor(b/2);
	});
	console.log( _.toArray(lists) );
});

rc.quit();
