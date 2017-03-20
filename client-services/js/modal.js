$(function() {
    $.fn.slideFadeToggle = function(speed, easing, callback) {
        return this.animate({ 
            opacity: 'toggle', height: 'toggle' }, 
            speed, 
            easing, 
            callback
        );
    };

    $('.lang-frame .frame-header').click(function(event) {
        $('.lang-frame .frame-body').slideFadeToggle();
    });
});
