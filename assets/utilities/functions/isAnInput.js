function isAnInput(elt) {
    var tn = $(elt).prop("tagName")
    if (!tn) {
        return false;
    }
    return (tn.toUpperCase() == 'INPUT')
}

export {isAnInput}