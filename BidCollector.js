var http = require('http'),
 url = require('url'),
 fs =  require("fs"),
 async = require('async'),
 request = require('request');


 
 
 function prepareAndMakeOutboundCalls(callback)
 {
 var entries = ['http://google.com', 'http://cricinfo.com', 'http://rediff.com'];
var methods = [];
for (var key in entries) {
  (function(key){
    methods.push(function(callback) {
	   return makeOutboundCall(entries[key]);
    });
  })(key);
}

for(var i = 0; i < methods.length; i ++)
{
	console.log(methods[i]);
}
console.log("Before calling parallel");
async.parallel(methods, function(err, results){
   console.log("results "+err); 
});

}

function makeOutboundCall(url) {
	    request(url, function (error, response, body) {
		console.log(url + response);
		handleResponse();	  
   });
}
 
 
 function  handleResponse() 
 {
	console.log("handleResponse");
 }
 

 
 var pixelTracker = function(req,res)
  {
	  var data = new Buffer(42);
      data.write("GIF89a\u0001\u0000\u0001\u0000\u0000\u0000\u0000\u0000\u0000ÿÿÿ!ù\u0004\u0001\u0000\u0000\u0000\u0000,\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0001D\u0000;", 'binary');
      var size = 42;
	  var headers = {
      'Content-Length': 42,
      'Content-Type':   "image/gif",
      'Pragma':         'no-cache',
      'Cache-Control':  "no-store, no-cache, must-revalidate, max-age=0,post-check=0,pre-check=0"
      }      
      res.writeHead(200, headers);
      res.end(data);
	  req.params = url.parse(req.url, true).query;
      console.log(req.params);
	  
	  prepareAndMakeOutboundCalls(makeOutboundCall);
  };
  http.createServer(pixelTracker).listen(8080,"127.0.0.1");

console.log("Server running at http://127.0.0.1:8080");