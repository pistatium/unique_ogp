var render = function() {
    var unique_ogp = require('./unique_ogp.js');
    var getArticon = function(title, brand) {
      var canvas = $("<canvas />");
      canvas[0].width = 1200;
      canvas[0].height = 630;
      canvas.width(1200);
      canvas.height(630);
      canvas = unique_ogp.draw(canvas, title, brand);
      return canvas;
    };
    var updateArticon = function() {
        var title = $("#form_title").val();
        var brand = $("#form_brand").val();
        var canvas = getArticon(title,  brand);
        var image = $("<img />").attr("src", canvas.getCanvasImage());
        $("#canvas").empty().append(image);
        $("#demo_title").text(title);
        $("#demo_brand").text(brand);
    };

    updateArticon();
    $("#form_title").change(updateArticon);
    $("#form_brand").change(updateArticon);
};

WebFont.load({
    custom: {
        families: ['Noto Sans Japanese'],
    },
    active: function() {
        render();
    }, 
    inactive: function() {
        // fallback
        render();
    }
});
