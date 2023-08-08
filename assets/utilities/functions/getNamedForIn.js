function getNamedForIn(p, n) {
    if (kindOfInput(n)) {
        return getByNameIn(p, n)
    }
    return getBySpanForIn(p, n)
}
export {getNamedForIn}