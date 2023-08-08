function setupFormValue(code) {
    $('[name="' + code + '"]').val(window[code])
    $('[span-for="' + code + '"]').html(window[code])
    animChanged($('[name="' + code + '"]'))
}

export {setupFormValue}