function repeatString(s, n) {
    var r = ""
    for (var i = 0; i < n; i++) {
        r = r + s
    }
    return r;
}

export {repeatString}