function checkValidGlobalValue(key) {
    if (isNaN(G_F(key)) || parseFloat(G_F(key)) === Infinity) {
        S_F(key, 0)
    }
}

export {checkValidGlobalValue}