var md5 = require("./md5.js"),
    colorful = require("colorful");

var HSV = colorful.HSV;

var hsv2rgb = function(h, s, v) {
    console.log(h);
    console.log(s/ 255);
    console.log(v/ 255);
    console.log("---");
    return new HSV(h, s /255, v/255).toCSSString();
};

var getFrontColor = function(h, i) {
    i = i % 15;
    return hsv2rgb(h, 270 - i * 2,150 + i / 2);
};

var getBackColor = function(h, s) {
    return hsv2rgb(h, s,270); 
};

var getAccentColor = function(h, i) {
    return hsv2rgb(h, 255 - i % 9, i * 8 + 100);
};

var createParams = function(title) {
    var hash = md5.md5(title);
    var p1 = title.length % 256;
    var p2 = parseInt(hash.slice(0, 2), 16);
    var p3 = parseInt(hash.slice(2, 4), 16);
    var p4 = parseInt(hash.slice(4, 6), 16);
    return [p1, p2, p3, p4];
};

exports.draw = function(title, canvas) {
    title = title || "";
    console.log(title);
    params = createParams(title); 
    var p1 = params[0];
    var p2 = params[1];
    var p3 = params[2];
    var p4 = params[3];

    var linear = canvas.createGradient({
        x1: 0, y1: 0,
        x2: 512, y2: 300,
        c1: "rgba(255, 255, 255, 0.2)", s1: 0.43,
        c2: "rgba(255, 255, 255, 0.5)", s2: 0.97
    });

    // Draw the outline of a cartoon face
    canvas.clearCanvas(); 

    var h = p1 * 7 % 256;
    canvas.drawRect({
        fillStyle: getBackColor(h, 20),
        x: 256, y: 256,
        width: 500,
        height: 500,
        cornerRadius: 50,
        shadowColor: '#ccc',
        shadowBlur: 6,
        shadowX: 6, shadowY: 6,
        mask: false,
    });
    canvas.drawRect({
        fillStyle: getBackColor(h, 30),
        x: 256, y: 256,
        width: 490,
        height: 490,
        cornerRadius: 45,
        mask: true,
    });
    var bubble_count = (p1 + p2 + p3) % 100 + 10;
    for (var i =1; i < bubble_count; i++) {
        var box_size = (i + 2) * 7 % 60;
        canvas.drawRect({
            fillStyle: getFrontColor(h, i),
            x: ((i + p3 + 1) * (p1 + 1) + i) % 512,
            y: ((i + p4 + 1) * (p2 + 1) + i) % 512,
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
            x: ((i + p1) * (p1 + 1) + p3 + i * (p4 + 1)) % 512,
            y: ((i + p2) * (p2 + 1) + p3 + i * (p4 + 1)) % 512,
            width: box_size,
            height: box_size,
            cornerRadius: 415
        });
    }
    /*canvas.drawPath({
        fillStyle: linear,
        strokeWidth: 0,
        p1: {
            type: 'line',
            x1: 6, y1: 6,
            x2: 6, y2:400,
        },
        p2: {
            type: 'quadratic',
            cx1: 256, cy1: 120,
            x2: 506, y2: 80
        },
        p3: {
            type: 'line',
            x1: 506, y1: 80,
            x2: 506, y2: 6,
            x3: 6, y3: 6
        }
    });
    */
    return canvas;
};
