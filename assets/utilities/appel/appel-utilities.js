
import { 
  isTelcoBoxMobile 
} from "utilities/contract/telcoenergie-utilities.js";

const APPEL_STATUT = [
    {
        key: "appeler_utilisateur_relance",
        text: "Répondeur",
    },
    {
        key: "refaire_devis",
        text: "Refaire le devis",
    },
    {
        key: "telecharger_devis",
        text: "Télécharger le devis",
    },
    {
        key: "appeler_utilisateur_replanifie",
        text: "Replanifier un RDV",
    },
    {
        key: "sans_suite",
        text: "Sans suite",
    },
    {
        key: "suppression_rgpd",
        text: "Suppression RGPD",
    },
]

const APPEL_STATUT_TELCO_TODO = [
    {
        key: "appeler_utilisateur_relance",
        text: "Répondeur",
    },
    {
        key: "appeler_utilisateur_replanifie",
        text: "Replanifier un RDV",
    },
    {
        key: "prendre_rdv_bemove",
        text: "Prendre un RDV avec Bemove",
    },
    {
        key: "sans_suite",
        text: "Sans suite",
    },
    {
        key: "suppression_rgpd",
        text: "Suppression RGPD",
    },
    {
        key: "balioriser_contrat_bemove",
        text: "Balioriser directement le contrat",
    },
]

const APPEL_STATUT_TELCO_LYRECO_TODO = [
    {
        key: "appeler_utilisateur_relance",
        text: "Répondeur",
    },
    {
        key: "appeler_utilisateur_replanifie",
        text: "Replanifier un RDV",
    },
    {
        key: "sans_suite",
        text: "Sans suite",
    },
    {
        key: "suppression_rgpd",
        text: "Suppression RGPD",
    },

    {
        key: "balioriser_contrat_bemove",
        text: "Balioriser directement le contrat",
    },
]

function getAppelStatuts(contrat=null){
    if (
        contrat && 
        isTelcoBoxMobile(contrat.nom) &&
        contrat.typologie == "TODO"
    ) {
        if(window.isCseLyreco && window.isCseLyreco  != undefined && window.isCseLyreco == true) {
            //return APPEL_STATUT_TELCO_LYRECO_TODO;
            return APPEL_STATUT_TELCO_TODO;
        }
        return APPEL_STATUT_TELCO_TODO;
    }
    return APPEL_STATUT;
}

function formatPhoneNumber(number){
    if(number){
        number = number.replace(/\D/g, '');

        if(number.startsWith('+33') && (number.length == 12)){
            return number;
        }
        else if(number.startsWith('0') && (number.length == 10)){
            return '+33' + number.substr(1);
        }
    }
    return null;
}

function verifyType(type){
    if(type === undefined){
        return 'appeler_utilisateur_todo';
    }
    else if(type == 'appel_bemove'){
        return 'appeler_bemove';
    }
    else if(type == 'appel_gestionnaire'){
        return 'appeler_gestionnaire';
    }
    else if(type == 'appel_todo'){
        return 'appeler_utilisateur_todo';
    }
    else if(type == 'appel_direct'){
        return 'appeler_utilisateur_direct';
    }
    else if(type == 'appel_suivit'){
        return 'appeler_utilisateur_suivit_validation';
    }

    return type;
}

function isSimpleCall(appel){
    return !appel || (
        appel.type != 'appeler_utilisateur_todo' &&
        appel.type != 'appeler_utilisateur_transfert_todo'
    )
}

function transfertType(appel){
    var type = null;
    if(isAppelNumero(appel)){
        type = 'appeler_numero_transfert';
    }
    else if(isAppelBemove(appel)){
        type = 'appeler_bemove_transfert';
    }
    else if(isAppelGestionnaire(appel)){
        type = 'appeler_gestionnaire_transfert';
    }
    else if(isAppelClient(appel, true)){
        type = 'appeler_utilisateur_transfert_todo';
    }
    else if(isAppelClient(appel)){
        type = 'appeler_utilisateur_transfert';
    }
    return type
}

function isAppelNumero(appel){
    return appel && (
        appel.type == 'appeler_numero' ||
        appel.type == 'appeler_numero_transfert'
    )
}

function isAppelBemove(appel){
    return appel && (
        appel.type == 'appeler_bemove' ||
        appel.type == 'appeler_bemove_transfert'
    )
}

function isAppelGestionnaire(appel){
    return appel && (
        appel.type == 'appeler_gestionnaire' ||
        appel.type == 'appeler_gestionnaire_transfert'
    )
}

function isAppelClient(appel, todo_only){
    if(todo_only){
        return appel && (
            appel.type == 'appeler_utilisateur_todo' ||
            appel.type == 'appeler_utilisateur_transfert_todo'
        )
    }
    else {
        return appel && (
            appel.type == 'appeler_utilisateur_todo' ||
            appel.type == 'appeler_utilisateur_direct' ||
            appel.type == 'appeler_utilisateur_transfert' ||
            appel.type == 'appeler_utilisateur_transfert_todo' ||
            appel.type == 'appeler_utilisateur_suivit_validation'
        )
    }
}

function isAppelTransfert(appel){
    return (
        appel &&
        appel.type &&
        appel.type.includes('transfert')
    )
}

/** ---------- ---------- ----------  ---------- ---------- ---------- ---------- */

function getCall(callback){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        return modals_view.getCall(callback);
    }

    return null;
}

function joinCall(params){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        modals_view.joinCall(params);
    }
}

function startCall(contrat, phone, type, then){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        modals_view.startCall(contrat, phone, type, then);
    }
}

function hangupedCall(){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        modals_view.hangupedCall();
    }
}

function hangupFromCall(jitsi_id,hangup_self){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        modals_view.hangupFromCall(jitsi_id, hangup_self);
    }
}

function toggleTargetBlank(enable){
    if(enable === true){
        $('a').addClass('appele-target-blank');
        $('a').attr('target', '_blank');
    }
    else {
        $('a.appele-target-blank').attr('target', '');
    }
}

function toggleAppelEncoursModal(show, conseiller){
    var appel_encours = window.jsx['AppelEncoursModal'];

    if(appel_encours){
        appel_encours.setConseiller(conseiller);
        appel_encours.toggleModal(show);
    }
}

function toggleAppelEntrantModal(show){
    var appel_entrant = window.jsx['AppelEntrantModal'];

    if(appel_entrant){
        appel_entrant.toggleBaliotone(show);
        appel_entrant.toggleModal(show);

        if(show){
            appel_entrant.sendNotification();
        }
    }
}

function toggleAppelEchecModal(show, conseiller){
    var appel_echec = window.jsx['AppelEchecModal'];

    if(appel_echec){
        appel_echec.setConseiller(conseiller);
        appel_echec.toggleModal(show);
    }
}

function toggleOverlay(show, text){
    var overlay = $('#app_overlay');

    if(show){
        text = text ? text : null;
        overlay.find('.text').text(text);
        overlay.addClass('show');
    }
    else {
        overlay.find('.text').text(null);
        overlay.removeClass('show');
    }
}



/** ---------- ---------- ----------  ---------- ---------- ---------- ---------- */

export {
    getCall,
    joinCall,
    startCall,
    hangupedCall,
    hangupFromCall,

    verifyType,
    isSimpleCall,

    getAppelStatuts,
    formatPhoneNumber,

    transfertType,

    isAppelBemove,
    isAppelNumero,
    isAppelClient,
    isAppelGestionnaire,
    isAppelTransfert,

    toggleOverlay,
    toggleTargetBlank,
    toggleAppelEchecModal,
    toggleAppelEncoursModal,
    toggleAppelEntrantModal,
}
