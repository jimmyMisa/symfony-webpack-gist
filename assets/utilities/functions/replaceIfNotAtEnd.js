function replaceIfNotAtEnd(selectionStart, um, status) {
    if (!status) {
        status = {}
    }
    if (selectionStart < um.length) {
        status.replaced = true
        if (um.substring(selectionStart, selectionStart + 1) == " ") {
            return um.substring(0, selectionStart) + um.substring(selectionStart + 2)
        }
        return um.substring(0, selectionStart) + um.substring(selectionStart + 1)
    }
    status.replaced = false
    return um
}

export {replaceIfNotAtEnd}