/* server.js */

var http = require("http"),
	route = require("./route.js"),
	url = require("url"),
	formidable = require('formidable');

function onRequest(req, res) {
	var body = "";
	var form;
	
	req.on("data", function(chunk) {
		body += chunk;
	});
	
	if (req.url == '/memo' && req.method.toUpperCase() == 'POST') {
		form = new formidable.IncomingForm();
		route.route(req, res, form);
	}

	else {
		req.on('end', function() {
			route.route(req, res, body);
		});
	}
}

var server = http.createServer(onRequest);
server.listen(8080);

console.log("Server Start!");
