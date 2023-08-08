function applyFocusNextOnEnter(query) {
    $(query).on('keydown', function(e) {
        var elt = $(this)
        if ((/input/i).test($(elt)[0].nodeName) && e.keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            if($(elt).val() !== '' && $(elt).val()!== undefined && $(elt).val()!== null){
                getNextField(elt,query)
            }
        }
    });
}
export {applyFocusNextOnEnter}