var http = require('http'),
	httpProxy = require('http-proxy'),
	fs = require('fs'),
	color = require('colors');
var urlLoader = require(__dirname+'/libs/urlLoader');

loadConf(function(conf){
	var proxy = httpProxy.createProxyServer({});

	var server = http.createServer(function(req,res){
		var dest = urlLoader.getTargetUrl(conf.routes,req.headers['host']);
		console.log("Redirect to".green,dest.target);
		proxy.web(req,res, dest , function(e){
			console.log("Error :".red, e.code.red, "- There is no server");
		});	
	});
	console.log("Listening on port".green, ""+conf.config.port);
	server.listen(conf.config.port);
});

function loadConf(callback){
	var conf;
	fs.readFile(__dirname +'/conf.json','utf-8', function(err,data){
		if(err){
			console.log("File: conf.json not load".red);
			return;
		}
		conf = JSON.parse(data);
		console.log("File: conf.json file loaded".green);
		callback(conf);
	});
}