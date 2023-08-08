function getPartenaires(){
    return window.partenaires;
}

function isPartenaire(source){
    var partenaires = getPartenaires();

    if(source && (0 <= partenaires.indexOf(source))){
        return true;
    }

    return false;
}

export {
    getPartenaires,
    isPartenaire,
}
