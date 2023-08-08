function getName(elt) {
    if (isAnInput(elt)) {
        return $(elt).attr('name')
    }
    return $(elt).attr('span-for')
}

export {getName}