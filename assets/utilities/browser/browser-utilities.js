function isChrome(){
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    return isChrome;
}

export {
    isChrome,
}
