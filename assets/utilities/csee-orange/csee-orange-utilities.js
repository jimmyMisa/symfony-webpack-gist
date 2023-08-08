function cseeSource(){
    return window.CSEE_ORANGE;
}

function telcoNoms(){
    return [
        'contract-box',
        'contract-mobile',
        "v2contract-new-box",
        "v2contract-new-mobile",
    ];
}

function isSourceCSEE(user_source){
    if(user_source){
        return (cseeSource() === user_source)
    }
    return (cseeSource() === window.user_source);
}

function isTelcoCseeOrange(user_source, contrat_nom){
    return (
        (cseeSource() === user_source) &&
        (telcoNoms().indexOf(contrat_nom) > -1)
    )
}

export {
    isSourceCSEE,
    isTelcoCseeOrange,
}
