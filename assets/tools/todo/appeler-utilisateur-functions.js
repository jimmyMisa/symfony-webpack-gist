function appelerUtilisateurException( onlyInNotification = false ){
    var exceptions = [
        "appeler_utilisateur_replanifie"
    ];
    if(onlyInNotification){
        exceptions.push('rappeler_utilisateur');
        exceptions.push('rappeler_utilisateur_baliorise');
    }
    return exceptions;
}

function isCall( notification, key, onlyInNotification ) {
    if(notification){
        var actionCode = notification[key];
        var hasStrAppeler = actionCode.indexOf("appeler");
        var callElementsException = appelerUtilisateurException(onlyInNotification);
        var isException = callElementsException.indexOf(actionCode);
        if(
            hasStrAppeler != -1 && 
            isException == -1
        ){
            return true;
        }
    }
    return false;
}

function navigateInFicheClient( config, task ){
    $('[href="#formulaires"]').tab('show');
    config.isActive = 'all-tab';
    config.tabId = 'formulaires';
    if( task.contra_home_id ){
        var idWillShow = "#collapse-All-"+task.contra_home_id;
    }
    else{
        var idWillShow = "#collapseRP-All";
    }
    var elt_collapse = $(idWillShow);
    elt_collapse.collapse("show")
    config.instance.refresh();
}

export {
    isCall,
    navigateInFicheClient
}