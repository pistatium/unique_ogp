var md5 = require("./md5.js"),
    color = require("onecolor");

var hsv2rgb = function(h, s, v) {
    return (new color.HSV(h/255, s/255 , v/255)).hex();
};

var getFrontColor = function(h, i) {
    i = i % 10;
    return hsv2rgb(h, 200 - i * 10, 120 + i);
};

var getBackColor = function(h) {
    return hsv2rgb(h, 200, 90); 
};

var getAccentColor = function(h, i) {
    i = i % 5;
    return hsv2rgb(h, (i + 2) * 5, i * 5 + 220);
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

var charcount = function(str){
  len = 0;
  str = escape(str);
  for (i=0; i<str.length; i++, len++) {
    if (str.charAt(i) == "%") {
      if (str.charAt(++i) == "u") {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
}

exports.draw = function(canvas, title, brand) {
    title = title || "";
    brand = brand || "";
    params = createParams(title); 
    var p1 = params[0];
    var p2 = params[1];
    var p3 = params[2];
    var p4 = params[3];
    var p5 = params[4];
    var p6 = params[5];

    var bright_style = canvas.createGradient({
        x1: 0, y1: 0,
        x2: 1200/2, y2: 630/3*2,
        c1: "rgba(255, 255, 255, 0.1)", s1: 0.43,
        c2: "rgba(255, 255, 255, 0.2)", s2: 0.97
    });

    canvas.clearCanvas(); 
    var h = (p3 + (p1 + p2) * 7) % 256;

    // Background
    canvas.drawRect({
        fillStyle: getBackColor(h),
        x: 1200/2, y: 630/2,
        width: 1200,
        height: 630,
        cornerRadius: 5,
        mask: true,
    });

    // Small Bubbles
    var bubble_count = (p1 + p2 + p3) % 50 + 80;
    for (var i =1; i < bubble_count; i++) {
        var x = ((i + p1) * (i + p4)) % 1200;
        var y = ((i + p2) * (i + p5)) % 630;
        var box_size = (630 - y)/8 - i/10;
        canvas.drawRect({
            fillStyle: getFrontColor(h, i),
            x: x, y: y,
            width: box_size,
            height:box_size,
            cornerRadius: 50
        });
    }

    // Large Bubbles
    var large_bubble_count = (p1 + p2 + p3) % 2 + 3;
    for (var i =1; i <= large_bubble_count; i++) {
        var x = (i * (300 + p4 - p5) + i * p2) % (1200 - 100) + 50;
        var y = ((i + p4) * (i + p2)) % (630 - 50);
        var box_size = (630 - y + 100) / 2;
        canvas.drawRect({
            fillStyle: getAccentColor(h, i),
            x:x, y:y,
            width: box_size,
            height: box_size,
            cornerRadius: 415
        });
    }

    // Title background
    canvas.drawRect({
        fillStyle: "rgba(0, 0, 0, 0.8)",
        x: 1200/2,
        y: 630 - 70,
        width: 1200,
        height: 140
    });

    // Brand
    canvas.drawText({
        fillStyle: "#ffffff",
        x: 1200/2,
        y: (630 - 140)/2,
	shadowColor: getBackColor(h),
  	shadowBlur: 5,
	shadowX: 3, shadowY: 3,
        fontSize: (1200 - 100) / (charcount(brand)/2 + 2),
        fontFamily: "'Noto Sans CJK JP Black', 'Noto Sans Japanese'",
        fontWeight: 900,
        text: brand,
    });
    // Title
    canvas.drawText({
        fillStyle: "#ffffff",
        x: 1200/2,
        y: 630 - 70,
        fontSize: (1200 - 50) / (charcount(title)/2 + 10),
        fontFamily: "'Noto Sans CJK JP Black', 'Noto Sans Japanese'",
        fontWeight: 900,
        text: title,
    });

    // hashtag
    canvas.drawText({
        fillStyle: "#ffffff",
        x: 1200 - 50,
        y: 630 - 10,
        fontSize: 12,
        fontFamily: "'Noto Sans CJK JP Black', 'Noto Sans Japanese'",
        text: "#unique_ogp",
    });

    //Brightness 
    canvas.drawPath({
        fillStyle: bright_style,
        strokeWidth: 0,
        p1: {
            type: 'line',
            x1: 0, y1: 0,
            x2: 0, y2:630 - 50,
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
