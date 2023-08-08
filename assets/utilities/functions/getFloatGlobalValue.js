function getFloatGlobalValue(key) {
    return parseFloat(window[key])
}

export {getFloatGlobalValue}