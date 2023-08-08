function outerHTML(e) {
    if (e && $(e).length && $(e)[0]) {
        if ($(e)[0].outerHTML) {
            return $(e)[0].outerHTML
        } else {
            var div = $('<div>')
            $(div).append($(e).clone())
            return $(div).html()
        }
    }
    return ""
}

export {outerHTML}