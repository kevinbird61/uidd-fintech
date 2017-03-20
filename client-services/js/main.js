var zoomlevel = 1;

$('body').dblclick(function(event) {
    zoomlevel = zoomlevel == 1 ? 2 : 1;

    $(this).css({
        "-moz-transform": "scale(" + zoomlevel + ")",
        "-webkit-transform": "scale(" + zoomlevel + ")",
        "-o-transform": "scale(" + zoomlevel + ")",
        "-ms-transform": "scale(" + zoomlevel + ")"
    });
});
