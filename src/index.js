const http = require('http');
    url = require('url'),
    fs = require('fs'),
    jquery = require('jquery'),
    jsdom = require('jsdom'),
    jCanvas = require('jcanvas'),
    unique_ogp = require('./unique_ogp.js');
const { registerFont } = require('canvas');
const Canvas = require('canvas');
const { JSDOM } = jsdom;

const OGP_IMAGE_PATH = '../resources/white.png';

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

    // TODO: refactor and adjust design after ogp design is created

    Canvas.loadImage(OGP_IMAGE_PATH)
        .then(img => {
            const drawCanvas = new Canvas.createCanvas(img.width,img.height);
            const ctx = drawCanvas.getContext('2d');

            ctx.drawImage(img, 0, 0);

            const x = (img.width / 2);
            const y = (img.height / 2);

            ctx.fillStyle = 'black';
            ctx.font = "bold 120px Arial";
            ctx.fillText(`OGP: ${title}`, x, y);

            response.writeHead(200, {
                "Content-Type": "image/png",
                "cache-control": "public, max-age=999999",
            });
            response.write(new Buffer.from(drawCanvas.toDataURL().split(',')[1], 'base64'));
            response.end();
        })
        .catch(err => {
            console.log(`err: ${err}`);
        })

}).listen(port, '0.0.0.0');
