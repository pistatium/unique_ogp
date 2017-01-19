var http = require('http');
    url = require('url'),
    fs = require('fs'),
    jquery = require('jquery'),
    jsdom = require('jsdom'),
    jCanvas = require('jcanvas'),
    unique_ogp = require('./unique_ogp.js');


var getArticon = function(title, brand, callback) {
    jsdom.env("", function (errors, window) {
      var $ = jquery(window);
      jCanvas( $, window);  
      var canvas = $("<canvas />");
      canvas[0].width = 1200;
      canvas[0].height = 630;
      canvas = unique_ogp.draw(canvas, title, brand);
      callback(canvas.get(0));
    });
};

// create server
http.createServer(function(request, response) {
    query = url.parse(request.url, true).query;
    title = query["title"];
    brand = query["brand"];
    if (!title) {
        response.write("Add Query to this page. '?title=$TITLE&brand=$BRAND'");
        return response.end();
    }
    getArticon(title, brand, function(result) {
        stream = result.pngStream();
        response.writeHead(200, {"Content-Type": "image/png"});
        stream.on("data", function(d) {
            response.write(d);
        });
        stream.on("end", function() {
            response.end();
        });
    });    
}).listen(8088, '0.0.0.0');
