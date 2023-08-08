function getBySpanForIn(p, n) {
    return $(p).find('[span-for="' + n + '"]')
}

export {getBySpanForIn}