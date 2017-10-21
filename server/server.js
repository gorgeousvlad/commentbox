const http = require("http"),
	qs = require("querystring"),
	mime = require("mime"),
	fs = require("fs"),
	path = require("path");

var server = http.createServer((req,res) => {
	var pathname = __dirname + req.url;
	console.log("path",pathname);
	fs.stat(pathname, (err,stats) => {
		if (err){
			res.writeHead(404);
			res.write("Resource missing 404\n");
			res.end();
			}
		else if (stats.isFile()){
			var type = mime.getType(pathname);
			console.log("type",type)
			res.setHeader("Content-Type",type);

			var file = fs.createReadStream(pathname);
			file.on("error",(err)=>{
				console.log(err);
				res.statusCode = 403;
				res.write("File permission");
				res.end();
				});
			file.on("open",()=>{
				res.statusCode = 200;
				file.pipe(res);
			})
			}
		else{
			res.writeHead(403);
			res.write("Directory access is forbidden");
			res.end();
			}
		});
	}).listen(9999);
console.log("Listening on port 9999...");	