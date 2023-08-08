function getTheFirstAvailableCreneau(creneaux){

    for(var i=0; i<creneaux.length; i++){
        if ( !(creneaux[i].disabled) ) {
            return creneaux[i].hour;
        }
    }
    return null;
}

export {
    getTheFirstAvailableCreneau
}