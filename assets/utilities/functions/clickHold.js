function clickHold(input, f) {
    // click and hold event listener

    var timeout_id = 0;
    var initial_hold_time = 200;
    var hold_time = initial_hold_time;


    $(input).on("mousedown", function() {
        var e = $(this)
        doAction(e)
        timeout_id = setInterval(function() {
            doAction(e)
        }, hold_time);
    });

    ['mouseup', 'mouseleave'].map(function(event) {
        $(input).on(event, function() {
            clearInterval(timeout_id);
            hold_time = initial_hold_time;
        });
    })

    /*    function addSpeed(){
            if(hold_time > 10){
                hold_time = hold_time - 10
            }
        }*/

    function doAction(e) {
        if (!f) {
            return true
        }
        f(e);
    }
}

export {clickHold}