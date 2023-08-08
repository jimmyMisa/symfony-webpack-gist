function roundNumber(value, step) {
    step = 5 * Math.pow(10, 0 - step)
    return round(value, step)
}

export {roundNumber}