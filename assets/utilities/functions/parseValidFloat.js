function parseValidFloat(x) {
    var sp = x.split(',')
    if (sp.length < 2) {
        return x + ",00";
    } else if (sp.length > 2) {
        return [sp[0], sp[1]].join(',')
    }
    return x
}

export {parseValidFloat}