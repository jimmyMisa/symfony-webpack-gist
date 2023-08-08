function getFocusables(elts) {
    if (!$(elts).length) {
        elts = $('*')
    }
    else{
        elts = $(elts)
    }


    function check(elts) {
        var r = []
        $(elts).each(function(k, element) {
            if (isFocusable(element, !isNaN($(element).attr('tabindex')))) {
                r.push($(element))
            }
        })
        return r;
    }

    return check(elts)
}

export {getFocusables}