function setTagValue(elt, value) {
    if (!isAnInput(elt)) {
        $(elt).text(value);
    } else {
        $(elt).val(value);
    }
}

export {setTagValue}