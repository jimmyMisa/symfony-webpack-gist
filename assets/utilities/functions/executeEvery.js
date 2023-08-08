function executeEvery(f, t, o) {
    if (!o) {
        o = {
            stoped: false,
            start: start,
            stop: stop,
        }
    }
    if (!t) {
        t = 1 * 60 * 1000
    }
    var interval = null
    starting()

    function starting() {
        if (!o.stoped) {
            setTimeout(function() {
                f(function() {
                    executeEvery(f, t, o)
                })
            }, t)
        }
    }

    function start() {
        o.stoped = false
        starting()
    }

    function stop() {
        o.stoped = true
    }

    return o;
}

export {executeEvery}