var size_adapter = document.getElementById('icon-frame');
var total_width = size_adapter.offsetWidth;
var total_height = size_adapter.offsetHeight;

var position,position2,position3,position4;
var fb,linkin,twitter,youtube;
var tween,tween2,tween3,tween4;

// fb-icon
fb = document.getElementById('fb-icon');
linkin = document.getElementById('linkin-icon');
twitter = document.getElementById('twitter-icon');
youtube = document.getElementById('youtube-icon');

var easing_type = TWEEN.Easing.Exponential.Out;

init();
animate();

function init(){
    position = {x:fb.style.left, y:fb.style.top, rotation: 0};
    tween = new TWEEN.Tween(position)
            .to({x:position.x+total_width/4, y: position.y+total_height/4,rotation:0},3000)
            .delay(0)
            .easing(easing_type)
            .onUpdate(update);
    position2 = {x:linkin.style.left ,y:linkin.style.top,rotation:0}
    tween2 = new TWEEN.Tween(position2)
            .to({x:position2.x+2*total_width/4, y:position2.y+2*total_height/4,rotation:0},3000)
            .delay(0)
            .easing(easing_type)
            .onUpdate(update2);
    position3 = {x:twitter.style.left ,y:twitter.style.top ,rotation:0}
    tween3 = new TWEEN.Tween(position3)
            .to({x:position3.x+3*total_width/4, y:position3.y+3*total_height/4,rotation:0},3000)
            .delay(0)
            .easing(easing_type)
            .onUpdate(update3);
    position4 = {x:youtube.style.left, y:youtube.style.top,rotation:0}
    tween4 = new TWEEN.Tween(position4)
            .to({x:position4.x+4*total_width/4, y:position4.y+4*total_height/4,rotation:0},3000)
            .delay(0)
            .easing(easing_type)
            .onUpdate(update4);

    tween.start();
    tween2.start();
    tween3.start();
    tween4.start();
}

function animate( time ) {
    requestAnimationFrame( animate );
    TWEEN.update( time );
}
function update() {
    fb.style.left = position.x + 'px';
    fb.style.top = position.y + 'px';
    //target.style.webkitTransform = 'rotate(' + Math.floor(position.rotation) + 'deg)';
    //target.style.MozTransform = 'rotate(' + Math.floor(position.rotation) + 'deg)';
}

function update2(){
    linkin.style.left = position2.x + 'px';
    linkin.style.top = position2.y + 'px';
}

function update3(){
    twitter.style.left = position3.x + 'px';
    twitter.style.top = position3.y + 'px';
}

function update4(){
    youtube.style.left = position4.x + 'px';
    youtube.style.top = position4.y + 'px';
}
