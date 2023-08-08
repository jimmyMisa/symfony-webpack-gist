function removeInvalidFeedBackIn(parent, fields, input) {
    if (input) {
        $(getClosestFormGroup(input)).find('.invalid-feedback').remove()
        $(input).removeClass('is-invalid');
    } else {
        $(parent).find('.invalid-feedback').remove()
        $(fields).removeClass('is-invalid');
    }
}

export {removeInvalidFeedBackIn}