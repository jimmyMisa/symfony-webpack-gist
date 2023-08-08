function json_decode(elt) {
    var r = null
    try {
        r = JSON.parse(elt);
    } catch (e) {
        r = null
    }
    return r;
}

export {json_decode}