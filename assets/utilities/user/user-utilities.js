function getUserCivility(gender){
    const CIVILITY = {
        M: 'M.',
        H: 'M.',
        F: 'Mme',
        Madame: 'Mme',
        Monsieur: 'M.',
    }

    var civility = CIVILITY[gender];
    civility = civility ? civility : '';
    return civility;
}

function getUserPhone(user){
    if(user){
        var profil = user.profil;
        var phone = profil ? profil.phone : '';

        return phone;
    }
    
    return ''
}

function getUserFormatedName(user, no_civility){
    if(user){
        var profil = user.profil;
        var gender = profil ? profil.gender : 'H';

        var civility = (no_civility === true) ? '' : getUserCivility(gender);
        
        var {lastname,firstname} = user

        if(!civility){
            civility = ''
        }
        if(!lastname){
            lastname = ''
        }
        if(!firstname){
            firstname = ''
        }

        if (!firstname && !lastname) {
            return ''
        }

        return civility + ' ' + lastname + ' ' + firstname
    }
    
    return ''
}

function getUserFormatedNameAnniv(user){
    if(user){

        var {lastname,firstname} = user
        
        if(!lastname){
            lastname = ''
        }
        if(!firstname){
            firstname = ''
        }

        return lastname + ' ' + firstname
    }
    
    return ''
}

function getConseillerFormatedName(user){
    if(user){
        var {lastname,firstname} = user

        if(!lastname){
            lastname = ''
        }
        if(!firstname){
            firstname = ''
        }

        return firstname + ' ' + lastname
    }
    
    return ''
}

function isHisFicheClient(client){
    //return client && location.href.includes(client.id)
    return true;
}

function checkFicheClient(client){
    if(client && client.id){
        var client_id = client.id;
        var current_url = location.href;

        return (
            (current_url.indexOf(client_id) > 0) &&
            (current_url.indexOf("fiche-client") > 0)
        )
    }

    return false;
}

function redirectToFicheClient(client, action, param){
    if(client && client.id){
        var url = window.url_v2_page_fiche_client;
        url = url.replace('user_id', client.id);

        if(action){
            localStorage.setItem('fc_action', action);
            url += (url.indexOf('?') >=0 ? '&' : '?') + "action="+action;

            if(param){
                url += "&param="+param;
            }
        }

        location.href = url;
    }
}

function getPathIconsOfSource(source){
    if(!source){
        return "/images/icons/icon_partenaire.webp";
    }

    source = source.toLowerCase();

    var names = {
        "partenaire": "/images/icons/icon_partenaire.webp",
        "partenaires": "/images/icons/icon_partenaire.webp",
        "bemove": "/images/icons/icon_bemove.webp",
        "pde": "/images/icons/icon_pde.webp",
        "mseb": "/images/icons/icon_mseb.webp",
    };

    if(source && names[source]){
        return names[source];
    }
    else if(source){
        return `/images/icons/icon_${source}.webp`;
    }

    return "/images/icons/icon_partenaire.webp";
}

export {
    getUserPhone,
    getUserCivility,
    getUserFormatedName,
    getConseillerFormatedName,
    isHisFicheClient,
    checkFicheClient,
    redirectToFicheClient,
    getUserFormatedNameAnniv,
    getPathIconsOfSource,
}
