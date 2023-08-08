function animChanged(elt) {
    $(elt).addClass('changed')
    setTimeout(function() {
        $(elt).removeClass('changed')
    }, 200)
}

export {animChanged}