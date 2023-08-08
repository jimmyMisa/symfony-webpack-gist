function kindOfInput(q) {
    var elts = getBySpanFor(q)
    if (elts.length && !isAnInput(elts[0])) {
        return false
    }
    return true
}

export {kindOfInput}