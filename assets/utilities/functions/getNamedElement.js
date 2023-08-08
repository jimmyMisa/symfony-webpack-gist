function getNamedElement(n) {
    if (kindOfInput(n)) {
        return getByName(n)
    }
    return getBySpanFor(n)
}

export {getNamedElement}