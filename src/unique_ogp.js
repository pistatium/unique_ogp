var md5 = require("./md5.js"),
    color = require("onecolor");

var hsv2rgb = function(h, s, v) {
    return (new color.HSV(h/255, s/255 , v/255)).hex();
};

var getFrontColor = function(h, i) {
    i = i % 10;
    return hsv2rgb(h, 70 + i * 10, 150 + i);
};

var getBackColor = function(h) {
    return hsv2rgb(h, 200, 90); 
};

var getAccentColor = function(h, i) {
    i = i % 5;
    return hsv2rgb(h, i * 5, i * 5 + 220);
};

var createParams = function(title) {
    var hash = md5.md5(title);
    var p1 = title.length % 256;
    var p2 = parseInt(hash.slice(0, 2), 16);
    var p3 = parseInt(hash.slice(2, 4), 16);
    var p4 = parseInt(hash.slice(4, 6), 16);
    var p5 = parseInt(hash.slice(6, 8), 16);
    var p6 = parseInt(hash.slice(8, 10), 16);
    return [p1, p2, p3, p4, p5, p6];
};

exports.draw = function(title, canvas) {
    title = title || "";
    console.log(title);
    params = createParams(title); 
    var p1 = params[0];
    var p2 = params[1];
    var p3 = params[2];
    var p4 = params[3];
    var p5 = params[4];
    var p6 = params[5];

    var linear = canvas.createGradient({
        x1: 0, y1: 0,
        x2: 512, y2: 300,
        c1: "rgba(255, 255, 255, 0.1)", s1: 0.43,
        c2: "rgba(255, 255, 255, 0.3)", s2: 0.97
    });

    // Draw the outline of a cartoon face
    canvas.clearCanvas(); 

    var h = p1 * 7 % 256;
    canvas.drawRect({
        fillStyle: getBackColor(h),
        x: 1200/2, y: 630/2,
        width: 1200,
        height: 630,
        cornerRadius: 5,
        mask: true,
    });
    var bubble_count = (p1 + p2 + p3) % 50 + 20;
    for (var i =1; i < bubble_count; i++) {
        var box_size = (i * 2 + 13) % 50;
        canvas.drawRect({
            fillStyle: getFrontColor(h, i),
            x: ((i + p3 + 1) * (p1 + 1) + i * i) % 1200,
            y: ((i + p4 + 1) * (p2 + 1) + (1000- i)) % 630,
            width: box_size,
            height:box_size,
            cornerRadius: 30
        });
    }
    var large_bubble_count = (p1 + p2) / 44 + 1;
    for (var i =1; i <= large_bubble_count; i++) {

        var box_size = (25 - i) * 18 % 200;
        canvas.drawRect({
            fillStyle: getAccentColor(h, i),
            x: ((i + p1) * (p1 + 1) + p3 + i * (p4 + 1)) % 1200,
            y: ((i + p2) * (p2 + 1) + p3 + i * (p4 + 1)) % 630,
            width: box_size,
            height: box_size,
            cornerRadius: 415
        });
    }
    canvas.drawRect({
        fillStyle: "rgba(0, 0, 0, 0.8)",
        x: 1200/2,
        y: 630 - 70,
        width: 1200,
        height: 140
    });
    canvas.drawText({
        fillStyle: "#ffffff",
        x: 1200/2,
        y: 630 - 70,
        fontSize: 1200 / (title.length + 10),
        fontFamily: '"Noto Sans CJK JP Black", Osaka-mono, monospace',
        text: title,
    });
    canvas.drawText({
        fillStyle: "#ffffff",
        x: 1200 - 50,
        y: 630 - 10,
        fontSize: 12,
        text: "#unique_ogp",
    });
    canvas.drawPath({
        fillStyle: linear,
        strokeWidth: 0,
        p1: {
            type: 'line',
            x1: 0, y1: 0,
            x2: 0, y2:500,
        },
        p2: {
            type: 'quadratic',
            cx1: 1200/2, cy1: 120,
            x2: 1200, y2: 80
        },
        p3: {
            type: 'line',
            x1: 1200, y1: 80,
            x2: 1200, y2: 0,
            x3: 0, y3: 0
        }
    });
    
    return canvas;
};
