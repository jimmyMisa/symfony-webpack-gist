function getFloattingValue(v) {
    var dv = parseFloat(v)
    if (isNaN(dv)) {
        return 0;
    }
    return dv
}
export {getFloattingValue}