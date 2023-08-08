function isFullTyped(elt, f) {
    var d_time = null
    var checker = false
    var d_date = new Date()
    $(elt).keydown(function() {
        var c_date = new Date()
        d_date = c_date
    });

    var index = 0;

    $(elt).unbind('keyup')
    $(elt).keyup(function(e) {
        var elt = $(this)
        if (
            e.keyCode == 37 ||
            e.keyCode == 38 ||
            e.keyCode == 39 ||
            e.keyCode == 40 ||
            e.keyCode == 16 ||
            e.keyCode == 18 ||
            e.keyCode == 20 ||
            e.keyCode == 91
        ) {
            return true
        }
        if (
            e.keyCode == 13 ||
            e.keyCode == 9
        ) {
            index = index + 1
            e.preventDefault()
            f(elt)
            return true
        }
        if (!checker) {
            tryTiming()
        }

        function tryTiming() {
            var currentIndex = index;
            checker = true
            setTimeout(function() {
                if (currentIndex != index) {
                    return true
                }
                var c_date = new Date()
                var c_time = c_date.getTime() - 1000
                d_time = d_date.getTime()
                if (d_time < c_time) {
                    checker = false
                    index = index + 1
                    f(elt)
                } else {
                    d_date = c_date
                    tryTiming()
                }
            }, 1000)
        }
    });
}

export {isFullTyped}