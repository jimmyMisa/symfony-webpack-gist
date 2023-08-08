function limitAfterComma(x, c) {
    x = x + ""
    x = x.split(".").join(",")
    x = parseValidFloat(x)
    var sp = x.split(',')
    if (sp.length == 2) {
        if (sp[1].length > c) {
            var av = sp[1].substring(0, c + 1)
            var v = [sp[0], av].join('.')
            var dv = Math.pow(10, c)
            if (v >= 0) {
                //v = Math.ceil(v * dv) / dv
            } else {
                //v = Math.floor(v * dv) / dv
            }
            v = roundNumber(v * dv) / dv
            var r = (v + "").split('.').join(',')
            if (r.split(',').length > 1) {
                r = r + repeatString("0", c)
                var spr = r.split(",")
                x = [spr[0], spr[1].substring(0, c)].join(',')
            } else if (c) {
                r = r + "," + repeatString("0", c)
                var spr = r.split(",")
                x = [spr[0], spr[1].substring(0, c)].join(',')
            } else {
                x = r
            }
        } else if (c) {
            var r = x
            r = r + repeatString("0", c)
            var spr = r.split(",")
            x = [spr[0], spr[1].substring(0, c)].join(',')
        }
    }
    return x
}

export {limitAfterComma}