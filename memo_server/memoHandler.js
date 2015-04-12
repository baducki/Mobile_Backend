/* memoHandler.js */

var MongoDb = require("mongodb"),
	MongoServer = new MongoDb.Server("localhost", 27017, {}),
	db = new MongoDb.Db("users", MongoServer),
	collection = db.collection("memo"),
	url = require("url"),
	fs = require("fs"),
	querystring = require("querystring"),
    formidable = require('formidable');
	
var UPLOAD_FOLDER = "./upload/";


exports.create = function(req, res, body) {

	var files = [],
    	fields = [],
    	resultPaths = [],
    	content = {};

	console.log("upload!");
	body.uploadDir = UPLOAD_FOLDER;
	body.keepExtensions = true;
	body.multiple="multiple";
	
	body.on('field', function(field, value) {
	        fields.push([field, value]);
	    })
	    .on('file', function(field, file) {
	        files.push([field, file]);
	    })
    	.on('fileBegin', function(name, file) {
			file.path = body.uploadDir + file.name;
		})
	    .on('progress', function(bytesReceived, bytesExpected) {
	        console.log('progress: ' + bytesReceived + '/' + bytesExpected);
	    })
	    .on('end', function() {
	        console.log('-> upload done');
	        
	        for (var field in files) {
	            resultPaths.push(files[field][1].path);
	        }
			        
	        for (var field in fields) {
	            if (fields[field][0] == "author") content.author = fields[field][1];
	            else if (fields[field][0] == "memo") content.memo = fields[field][1];
	        }
	
	        content.date = new Date();
	        content.file = resultPaths;
	
	        console.log(JSON.stringify(content));
	
	        db.open(function(err) {
	            if (err) throw err;
	            collection.insert(content, function(err, data) {
	                if (err) throw err;
	                console.log("insert Data: ", data.result);
	                db.close();
	            });
	        });
	    });

	body.parse(req, function(err, fields, files) {
	    res.writeHead(200, { "Content-type" : "application/json" });
		res.write(JSON.stringify(content));
	    res.end();
	});
};


exports.read = function(req, res) {
	_findMemo({}, function(error, results) {
			res.writeHead(200, { "Content-type" : "application/json" });
			res.write(results);
			res.end();
	 });
};

exports.update = function(req, res, body) {
	var query = url.parse(req.url).query;
	var where = querystring.parse(query);
	
	_updateMemo(where, body, function(error, results) {
		res.writeHead(200, { "Content-type" : "application/json" });
		res.write("update memo");
		res.end();
	});
};

exports.remove = function(req, res, body) {
	var query = url.parse(req.url).query;
	var where = querystring.parse(query);
	
	_removeMemo(where, function(error, results) {
		res.writeHead(200, { "Content-type" : "text/plain" });
		res.write("remove memo");
		res.end();
	});
};

function _findMemo(where, callback) {
	where = where || { };
	
	db.open(function(err) {
        if (err) throw err;
        collection.find(where).toArray(function(err, data) {
            if (err) throw err;
            
            var foundData = JSON.stringify(data);
            
            console.log("find Data: ", foundData);
            db.close();
            callback(null, foundData);
        });
    });
}

function _updateMemo(where, body, callback) {
	body = typeof body === "string" ? JSON.parse(body) : body;
	
	var operator = {$set : body};
	var options = { multi : true };
	
	db.open(function(err) {
        if (err) throw err;
        collection.update(where, operator, options, function(err, data) {
            if (err) throw err;
            
            console.log("update Data: ", data.result);
            db.close();
            callback(null, data);
        });
    });
}

function _removeMemo(where, callback) {
	var options = { multi : true };
	
	db.open(function(err) {
        if (err) throw err;
        collection.remove(where, options, function(err, data) {
            if (err) throw err;
            
            console.log("remove Data: ", data.result);
            db.close();
            callback(null, data);
        });
    });
}