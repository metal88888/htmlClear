!(function($) {

    var $event = $.event,
        $special,
        dummy = {_:0},
        frame = 0,
        wasResized, animRunning;

    $special = $event.special.throttledresize = {
        setup: function() {
            $( this ).on( "resize", $special.handler );
        },
        teardown: function() {
            $( this ).off( "resize", $special.handler );
        },
        handler: function( event, execAsap ) {
            // Save the context
            var context = this,
                args = arguments;

            wasResized = true;

            if ( !animRunning ) {
                setInterval(function(){
                    frame++;

                    if ( frame > $special.threshold && wasResized || execAsap ) {
                        // set correct event type
                        event.type = "throttledresize";
                        $event.dispatch.apply( context, args );
                        wasResized = false;
                        frame = 0;
                    }
                    if ( frame > 9 ) {
                        $(dummy).stop();
                        animRunning = false;
                        frame = 0;
                    }
                }, 30);
                animRunning = true;
            }
        },
        threshold: 0
    };
})(jQuery);
!(function($) {
    var $event = $.event,
        $special,
        resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function() {
            $( this ).on( "resize", $special.handler );
        },
        teardown: function() {
            $( this ).off( "resize", $special.handler );
        },
        handler: function( event, execAsap ) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function() {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply( context, args );
                };

            if ( resizeTimeout ) {
                clearTimeout( resizeTimeout );
            }

            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout( dispatch, $special.threshold );
        },
        threshold: 150
    };
})(jQuery);

//$.event.special.debouncedresize.threshold = 250;
// decrease the firing rate to a maximum of 30fps
//$.event.special.throttledresize.threshold = 1;
// 2 <=> 20fps, 3 <=> 15fps, ...


