function getTagValue(elt) {
    if (!isAnInput(elt)) {
        return $(elt).text();
    } else {
        return $(elt).val();
    }
}

export {getTagValue}