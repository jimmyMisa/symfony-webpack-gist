function getFa(faCode) {
    var fa = $('<i>')
    $(fa).addClass('fa')
    $(fa).addClass('fa-' + faCode)
    return fa
}
export {getFa}