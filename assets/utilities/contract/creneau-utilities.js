function getTextPriseCreneau(type, addBracket=null){
    var result = null;
    if(type == "USER_VALIDATION_FORMULAIRE"){
        result = "utilisateur a validé son formulaire";
    }
    else if(type == "USER_VALIDATION_CRENEAU"){
         result = "utilisateur a validé son rendez-vous";
    }
    else if(type == "CONSEILLER_VALIDATION_FORMULAIRE"){
         result = "conseiller a validé le rendez-vous";
    }

    if(addBracket && result){
        result = "(" + result + ")";
    }
    return result;
}


export {
    getTextPriseCreneau,
}
