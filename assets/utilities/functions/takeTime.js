function takeTime(f) {
    return function() {
        setTimeout(f, 100)
    }
}

export {takeTime}