function getByNameIn(p, n) {
    return $(p).find('[name="' + n + '"]')
}

export {getByNameIn}