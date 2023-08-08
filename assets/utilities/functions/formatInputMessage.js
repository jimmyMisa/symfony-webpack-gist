function formatInputMessage(message) {
    var span = $('<span>')
    $(span).addClass('error')
    $(span).addClass('invalid-feedback')
    $(span).css('display', 'inline')
    $(span).text(message)

    return span
}

export {formatInputMessage}