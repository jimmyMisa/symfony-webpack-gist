function getNextField(elt,query) {
    var canfocus = getFocusables(query)
    var index = -1
    canfocus.map(function(element, i) {
        if (element[0] == elt[0]) {
            index = i
        }
    });
    index = index + 1
    if (index >= $(canfocus).length){
        index = 0;
    } 
    var de = $(canfocus).eq(index)
    de.focus();
}

export {getNextField}