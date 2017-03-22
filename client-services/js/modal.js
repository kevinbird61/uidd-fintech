$(function() {
    $.fn.slideFadeToggle = function(speed, easing, callback) {
        return this.animate({ 
            opacity: 'toggle', height: 'toggle' }, 
            speed, 
            easing, 
            callback
        );
    };

    $('#lang .lang-header').click(function(event) {
        $('#lang .lang-body').slideFadeToggle();
    });
});
