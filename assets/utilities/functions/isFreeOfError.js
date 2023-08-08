function isFreeOfError(errors) {
    if (errors) {
        var freeOfError = true;
        Object.keys(errors).map(function(key) {
            var m = errors[key]
            if (m) {
                freeOfError = false
            }
        })
        return freeOfError;
    }
    return true
}

export {isFreeOfError}