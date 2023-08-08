function isVisible(element) {
    return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
        return $.css(this, 'visibility') === 'hidden';
    }).length;
}

export {isVisible}