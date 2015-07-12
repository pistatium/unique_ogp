var http = require('http');
    url = require('url'),
    fs = require('fs'),
    jquery = require('jquery'),
    jsdom = require('jsdom'),
    jCanvas = require('jcanvas'),
    articon = require('./articon.js');


var getArticon = function(title, callback) {
    jsdom.env( "", function ( errors, window ) {
      var $ = jquery(window);
      jCanvas( $, window);  
      var canvas = $("<canvas />");
      canvas[0].width = 512;
      canvas[0].height = 512;
      canvas = articon.draw(title, canvas);
      callback(canvas.get(0));
    });
};
// create server
http.createServer(function(request, response) {
    query = url.parse(request.url, true).query;
    title = query["title"];
    if (!title) {
        response.write("?title=好きな文字を入れてリクエストしてください");
        return response.end();
    }
    getArticon(title, function(result) {
        stream = result.pngStream();
        response.writeHead(200, {"Content-Type": "image/png"});
        stream.on("data", function(d) {
            response.write(d);
        });
        stream.on("end", function() {
            response.end();
        });
    });    
}).listen(8088, '127.0.0.1');
