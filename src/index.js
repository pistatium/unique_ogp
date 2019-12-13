const http = require('http');
    url = require('url'),
    fs = require('fs'),
    jquery = require('jquery'),
    jsdom = require('jsdom'),
    jCanvas = require('jcanvas'),
    unique_ogp = require('./unique_ogp.js');
const { registerFont } = require('canvas');
const { JSDOM } = jsdom;

var getArticon = function(title, brand, mode) {
    registerFont('./fonts/NotoSansCJKjp-Black.otf', {'family': 'noto', 'weight': 'bold'});
    const { window } = new JSDOM(`<!DOCTYPE html><canvas id="canvas" width="1200" height="630"></canvas>`, {runScripts: "outside-only"});
    const $ = jquery(window);
    jCanvas($, window);
    var canvas = $("#canvas");
    canvas = unique_ogp.draw(canvas, title, brand, mode);
    return canvas[0];
};

const port = process.env.PORT || 8088;

function atob(a) {
    return Buffer.from(a, 'base64')
}
// create server
http.createServer(function(request, response) {
    let query = url.parse(request.url, true).query;
    let title = query["title"];
    let brand = query["brand"];
    let mode = query["mode"];
    if (!title) {
        response.write("Add Query to this page. '?title=$TITLE&brand=$BRAND'");
        return response.end();
    }
    let canvas = getArticon(title, brand, mode);
    const image = atob(canvas.toDataURL('image/jpeg', 0.75).split(',')[1]);
    response.writeHead(200, {
	    "Content-Type": "image/jpeg",
	    "cache-control": "public, max-age=999999",
    });

    response.write(image);
    response.end();

}).listen(port, '0.0.0.0');
