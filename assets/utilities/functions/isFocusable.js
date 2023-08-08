function isFocusable(element, isTabIndexNotNaN) {
    var map, mapName, img, nodeName = element.nodeName.toLowerCase();
    if ('area' === nodeName) {
        map = element.parentNode;
        mapName = map.name;
        if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
            return false;
        }
        img = $('img[usemap=#' + mapName + ']')[0];
        return !!img && visible(img);
    }
    if (!isVisible(element)) {
        return false;
    }
    if ((/input|select|textarea|button|object/i).test(nodeName)) {
        return (!$(element).attr('disabled') && !$(element).attr('readonly'));
    }
    if ('a' === nodeName) {
        return (element.href || isTabIndexNotNaN)
    }
    return isTabIndexNotNaN;
}

export {isFocusable}