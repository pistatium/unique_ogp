$(function() {
    var unique_ogp = require('./unique_ogp.js');
    var getArticon = function(title, brand) {
      var canvas = $("<canvas />");
      canvas[0].width = 1200;
      canvas[0].height = 630;
      canvas.width(1200);
      canvas.height(630);
      canvas = unique_ogp.draw(canvas, title, brand);
      return canvas.get(0);
    };
    canvas = getArticon("test", "fuga");
    $("#canvas").append(canvas);
});
