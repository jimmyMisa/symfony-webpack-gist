import { v2RobotModal } from "modules/v2/balio-robot/js/functions.js"
import { isChrome } from "utilities/browser/browser-utilities.js"
import { toggleOverlay } from "utilities/appel/appel-utilities.js";
import { setTacheStatut } from "api/todo/todo-api.js";

import { getConfig } from "modules/v2/page/fichierClient/main.js";

import { 
    getCeneauExistFromContrat
} from "modules/appointment/api/contract_api";

import { 
    traitementMajCreneau
} from "modules/appointment/api/creneau_form_api";

import {
    changeStatusAndCreateTodo,
} from "modules/contrat/functions/api.js";

import {getHelperData} from "modules/v2/page/fichierClient/helper.js";
import { sendRequestSurbrillance } from "utilities/contract/contract-surbrillance.js";

import { isContractEnergie } from "utilities/contract/contract-utilities.js";

const TACHE_STATUT = { 
    a_finaliser: {
        key: "a_finaliser",
        buttonText: "À finaliser",
        buttonClick: openOnIframe,
    },
    realiser_devis_auto_mrh:{
        key: "realiser_devis_auto_mrh",
        buttonText: "Réaliser le devis",
        buttonClick: showModalDevis,
        linkText: "Voir le détail",
        linkClick: openOnIframe,
    },
    realiser_devis_autre: {
        key: "realiser_devis_autre",
        buttonText: "Réaliser le devis",
        buttonClick: showModalDevis,
        linkText: "Voir le détail",
        linkClick: openOnIframe,
    },
    lancer_robot: {
        key: "lancer_robot",
        buttonText: "Lancer les robots",
        buttonClick: showRobotModal,
        linkText: "Définir formule",
        linkClick: showModalFormule,
    },
    definir_formule: {
        key: "definir_formule",
        buttonText: "Définir formule",
        buttonClick: showModalFormule,
    },
    appeler_utilisateur: {
        key: "appeler_utilisateur",
        buttonText: "Appeler l'utilisateur",
        buttonClick: showModalAppelInoCx,
        linkText: "Déjà appelé",
        linkClick: showModalAppelStatutAction({isCalled:true, statut:'definir_statut_appel'}),
    },
    definir_statut_appel: {
        key: "definir_statut_appel",
        buttonText: "Définir le statut de l'appel",
        buttonClick: showModalAppelStatut,
    },
    refaire_devis: {
        key: "refaire_devis",
        buttonText: "Refaire le devis",
        buttonClick: showModalDevis,
        linkText: "Voir le détail",
        linkClick: openOnIframe,
    },
    appeler_utilisateur_replanifie: {
        key: "appeler_utilisateur_replanifie",
        buttonText: "Replanifier un RDV",
        buttonClick: showModalReplanifierRdv,
        linkText: "Voir le détail",
        linkClick: openOnIframe,
    },
    sans_suite: {
        key: "sans_suite",
        buttonText: "Sans suite",
        buttonStatut: "disabled_grey",
    },
    appeler_utilisateur_relance: {
        key: "appeler_utilisateur_relance",
        buttonText: "Appeler l'utilisateur",
        buttonClick: showModalAppelInoCx,
        linkText: "Déjà appelé",
        linkClick: showModalAppelStatutAction({isCalled:true, statut:'definir_statut_appel'}),
    },
    recuperer_documents: {
        key: "recuperer_documents",
        buttonText: "Récupérer les documents",
        buttonClick: showModalRecupererDocs,
    },
    telecharger_devis: {
        key: "telecharger_devis",
        buttonText: "Télécharger le devis",
        buttonClick: showModalTelechargerDevis,
        linkText: "Récupérer les documents",
        linkClick: showModalRecupererDocs,
    },
    definir_espace_signature: {
        key: "definir_espace_signature",
        buttonText: "Définir l'espace de signature",
        buttonClick: showModalSignature,
    },
    en_attente_validation: {
        key: "en_attente_validation",
        buttonText: "En attente de validation",
        buttonStatut: "disabled_grey",
        linkText: "Valider",
        linkClick: validateDevis,
        link2Text: "Refuser",
        link2Click: declineDevis,
        linkTopText: "Récupérer les documents",
        linkTopClick: showModalRecupererDocs,
    },
    en_attente_signature: {
        key: "en_attente_signature",
        buttonText: "En attente de signature",
        buttonStatut: "disabled_grey",
        linkText: "Signé",
        linkClick: signedDocs,
        linkTopText: "Récupérer les documents",
        linkTopClick: showModalRecupererDocs,
    },
    resilier_ancien_contrat: {
        baliorized: true,
        key: "resilier_ancien_contrat",
        buttonText: "Résilier l'ancien contrat",
        buttonClick: showModalResilierContrat,
        linkText: "Passer cette étape",
        linkClick: skipResiliation(),

    },
    prendre_garanties: {
        baliorized: true,
        key: "prendre_garanties",
        buttonText: "Prendre les garanties",
        buttonClick: showModalGarantie,
    },
    appeler_utilisateur_suivit_validation: {
        key: "appeler_utilisateur_suivit_validation",
        buttonText: "Appeler l'utilisateur",
        buttonClick: showModalAppelSimpleInoCx,
    },
    envoyer_carte_verte: {
        baliorized: true,
        key: "envoyer_carte_verte",
        buttonText: "Envoyer la carte verte",
        buttonClick: showModalCarteVerte,
    },
    envoyer_dispositions_particulieres: {
        baliorized: true,
        key: "envoyer_dispositions_particulieres",
        buttonText: "Envoyer les dispositions",
        buttonClick: showModalDispositions,
    },
    baliorise: {
        baliorized: true,
        key: "baliorise",
        buttonText: "Baliorisé",
    },
    veille_annuelle: {
        baliorized: true,
        key: "veille_annuelle",
        buttonText: "Baliorisé",
    },
    suppression_rgpd: {
        key: "suppression_rgpd",
        buttonText: "Suppression RGPD",
        buttonStatut: "disabled_grey",
    },
    prendre_rdv_bemove: {
        key: "prendre_rdv_bemove",
        buttonText: "Prendre un RDV avec Bemove",
        buttonClick: showModalPrendreRdvBemove,
    },
    balioriser_contrat_bemove: {
        key: "balioriser_contrat_bemove",
        buttonText: "Balioriser",
        buttonClick: showModalBalioriserContrat,
    },
    modal_edit_information_contrat: {
        key: "modal_edit_information_contrat",
        buttonText: "Modifier information",
        buttonClick: showModalEditInformationContrat,
    }
}
/** ---------------------------------------- Exportable functions ---------------------------------------- */

function openOnIframe(contrat){
    return () => {
        var tab = window.jsx['Tab'];
         
        if(contrat && tab){
            tab.showFormOrIframe(contrat);
        }
    }
}

function showModalDevis(contrat){
    return () => {
        contentShowModalDevis(contrat)
    }
}

function contentShowModalDevis(contrat) {
    var modal_devis = window.jsx['ModalDevis'];

    if(contrat && modal_devis){
        modal_devis.setContrat(contrat);
        modal_devis.toggleModal(true);
    }
}

function showRobotModal(contrat){
    return () => {
        if(contrat){
            v2RobotModal(contrat.id);
        }
    }
}

function showModalFormule(contrat){
    return () => {
        var modal_formule = window.jsx['ModalFormule'];

        if(contrat && modal_formule){
            modal_formule.setContrat(contrat);
            modal_formule.loadExtranets();
            modal_formule.toggleModal(true);
        }
    }
}

function showModalAppel(contrat){
    return () => {
        var modals_view = window.jsx['ModalsView'];

        if(contrat && modals_view){
            modals_view.startCall(contrat, null, 'appel_todo');
        }
    }
}

/*
    Cas où on utilise InoCx pour l'appel
*/
function showModalAppelInoCx(contrat){
    return () => {
        var modals_view = window.jsx['ModalsView'];

        if(contrat && modals_view){
            var data = {
                "contrat": contrat,
                "type": "appel_todo"
            }
            modals_view.startInoCxCall(data);
        }
    }
}


function showModalAppelStatutAction({isCalled = false, statut}){
    return (contrat) =>{
        return (event) =>{
            var run = () =>{
                getConfig().load()
                toggleOverlay(false)
                console.log("running" , contrat)
                showModalAppelStatut(contrat)()
            }
            if(isCalled){
                console.log({isCalled,contrat});
                var id = null;
                if(contrat && contrat.id){
                    id = contrat.id
                }
                if(id){
                    toggleOverlay(true)
                    getConfig().setIsCalled({id, then:(result = {}) =>{
                        var {id,tacheStatut} = contrat
                        console.log("pre running" , result)
                        if(result && result.status && result.status == '1200' && result.message == 'ok'){
                            //create or update surbrillance contrat
                            var info = {
                                gestionnaire_id : window.user_id_surbriller,
                                contrat_id : contrat.id,
                                user_id : window.user_id,
                            };
                            sendRequestSurbrillance(info, () => {
                                setTacheStatut(
                                    id, 
                                    tacheStatut, 
                                    statut, 
                                    false, 
                                    run
                                )
                            })
                        }
                        else{
                            toggleOverlay(false)
                        }
                    }})
                }
            }
            else{
                run()
            }
        }
    }
}
function skipResiliation(){
    return (contrat) =>{
        return (event) =>{
            if(
                !contrat ||
                !contrat.id
            ){
                console.log("/!\\ information incomplete : ",{
                    contrat:contrat,
                })
                return false;
            }

            toggleOverlay(true)

            var callback = () => {
                if(
                    !window.user_id_surbriller ||
                    !window.user_id ||
                    !contrat ||
                    !contrat.id
                ){
                    console.log("/!\\ information incomplete au retour : ",{
                        gestionnaire_id:window.user_id_surbriller,
                        contrat:contrat,
                        user_id:window.user_id,
                    })
                    return false;
                }

                var info = {
                    gestionnaire_id : window.user_id_surbriller,
                    contrat_id : contrat.id,
                    user_id : window.user_id,
                };
                sendRequestSurbrillance(info, () => {
                    toggleOverlay(false)
                    getConfig().load();
                })
            }
            getConfig().updateTacheStatut(
                contrat,
                contrat.tacheStatut,
                'prendre_garanties',
                false,
                callback
            )
        }
    }
}


function showModalAppelStatut(contrat){
    return () => {
                console.log("running toogle" , contrat)
        var modal_appel_statut = window.jsx['ModalAppelStatut'];

        if(contrat && modal_appel_statut){
            modal_appel_statut.setContrat(contrat);
            modal_appel_statut.toggleModal(true);
        }
    }
}

function priseRendezVousReplanifier(contrat) {
    window.contract = {
        id: contrat.id,
        nom: contrat.nom,
        isValidationForm: true,
        isAcceptCall: true,
        hasCreneau: false,
    }
    window.creneau_global_date = null;
    window.creneau_global_time = null;
    window.creneau_global_times_loops = [];
    window.creneau_global_syntheses = [];
    if (window.indexCreneauRdv) {
        $(window.indexCreneauRdv.$refs.input_date).val("");
        $(window.indexCreneauRdv.$refs.creneau_time).val("");
    }
    setTimeout(() => {
        var date = null;
        window.stopRequestSecond = false;
        getCeneauExistFromContrat(() => {
            $(window.indexCreneauRdv.$refs.input_date).val(date)
            window.indexCreneauRdv.setDate(date) 
        })
        setTimeout(() => {
            //Traitement de la mise à jour de la liste des creneaux en fonction de temps
            traitementMajCreneau()
        },1000)
    },500)
}

function showModalReplanifierRdv(contrat){
    return () => {
        var modal_replanifier = window.jsx['ModalReplanifierRdv'];
        if(contrat && modal_replanifier){
            modal_replanifier.setContrat(contrat);

            /*Uniformisation prise de rendez-vous de replanifier*/
            // priseRendezVousReplanifier(contrat);
            /*Uniformisation prise de rendez-vous de replanifier*/

            modal_replanifier.loadCreneaux();
            modal_replanifier.toggleModal(true);
        }
    }
}

function showModalTelechargerDevis(contrat){
    return () => {
        var modal_telecharger = window.jsx['ModalTelechargerDevis'];
        if (
            contrat && 
            isContractEnergie(contrat.nom) && 
            isTodoTypologie(contrat)
        ) {
            modal_telecharger = window.jsx['ModalTelechargerDevisTelcoEnergie'];
        }

        if(contrat && modal_telecharger){
            modal_telecharger.setContrat(contrat);
            modal_telecharger.loadPredata();
            modal_telecharger.toggleModal(true);
        }
    }
}

function showModalSignature(contrat){
    return () => {
        if(!isChrome()){
            showBadBrowserModal(contrat)();
        }
        else {
            var modal_signature = window.jsx['ModalSignature'];

            if(contrat && modal_signature){
                modal_signature.setContrat(contrat);
                modal_signature.loadDocuments();
                modal_signature.toggleModal(true);
            }
        }
    }
}

function showBadBrowserModal(contrat){
    return () => {
        var modal_bad_browser = window.jsx['ModalBadBrowser'];

        if(contrat && modal_bad_browser){
            modal_bad_browser.setContrat(contrat);
            modal_bad_browser.toggleModal(true);
        }
    }
}

function showModalAppelSuivi(contrat){
    return () => {
        var modals_view = window.jsx['ModalsView'];

        if(contrat && modals_view){
            modals_view.startCall(contrat, null, 'appel_suivit');
        }
    }
}

function showModalAppelSimple(contrat){
    return () => {
        var modals_view = window.jsx['ModalsView'];

        if(contrat && modals_view){
            modals_view.startCall(contrat, null, 'appel_suivit');
        }
    }
}

function showModalAppelSimpleInoCx(contrat){
    return () => {
        var modals_view = window.jsx['ModalsView'];

        if(contrat && modals_view){
            var data = {
                "contrat": contrat,
                "type": "appel_suivit"
            }
            modals_view.startInoCxCall(data);
        }
    }
}

function showModalResilier(contrat){
    return () => {
        var modal_resilier = window.jsx['ModalResilier'];

        if(contrat && modal_resilier){
            modal_resilier.setContrat(contrat);
            modal_resilier.toggleModal(true);
        }
    }
}

function showModalResilierContrat(contrat){
    return () => {
        var modal_resilier = window.jsx['ModalResilierContrat'];
        
        if(contrat && modal_resilier){
            modal_resilier.setContrat(contrat);
            modal_resilier.toggleModal(true);
        }
    }
}

function showModalGarantie(contrat){
    return () => {
        var modal_garantie = window.jsx['ModalGarantie'];
        if(contrat && modal_garantie){
            modal_garantie.setContrat(contrat);
            modal_garantie.toggleModal(true);
        }
    }
}

function showModalDispositions(contrat){
    return () => {
        var modal_dipositions = window.jsx['ModalDispositions'];

        if(contrat && modal_dipositions){
            modal_dipositions.setContrat(contrat);
            modal_dipositions.toggleModal(true);
        }
    }
}

function showModalCarteVerte(contrat){
    return () => {
        var modal_cartev = window.jsx['ModalCarteVerte'];

        if(contrat && modal_cartev){
            modal_cartev.setContrat(contrat);
            modal_cartev.toggleModal(true);
        }
    }
}

function showModalRecupererDocs(contrat, type=null){
    return () => {
        var modal_recuperer = window.jsx['ModalRecupererDocs'];

        if(contrat && modal_recuperer){
            if (type) {
                modal_recuperer.setContrat(contrat, type);
            }
            else {
                modal_recuperer.setContrat(contrat);
            }
            modal_recuperer.loadGestionnaireDocuments();
            modal_recuperer.toggleModal(true);
        }
    }
}

function showModalPrendreRdvBemove(contrat){
    return () => {
        var modal_prendre_rdv_bemove = window.jsx['ModalPrendreRdvBemove'];
        if(contrat && modal_prendre_rdv_bemove){
            modal_prendre_rdv_bemove.setContrat(contrat);
            modal_prendre_rdv_bemove.getCreneauBemove();
            modal_prendre_rdv_bemove.toggleModal(true);
        }
    }
}

function showModalBalioriserContrat(contrat){
    return () => {
        var modalbaliorisercontratbemove = window.jsx['ModalBalioriserContratBemove'];
        if(contrat && modalbaliorisercontratbemove){
            modalbaliorisercontratbemove.setContrat(contrat);
            modalbaliorisercontratbemove.toggleModal(true);
        }
    }
}

function showModalEditInformationContrat(contrat){
    return () => {
        var modaleditinformationcontrat = window.jsx['ModalEditInformationContrat'];
        if(contrat && modaleditinformationcontrat){
            modaleditinformationcontrat.setContrat(contrat);
            modaleditinformationcontrat.toggleModal(true);
        }
    }
}

function validateDevis(contrat){
    return () => {
        var fiche_client = window.jsx['FichierClientView'];

        if(contrat && fiche_client){
            fiche_client.validateDevisContrat(contrat);
        }
    }
}

function declineDevis(contrat){
    return () => {
        var fiche_client = window.jsx['FichierClientView'];

        if(contrat && fiche_client){
            fiche_client.declineDevisContrat(contrat);
        }
    }
}

function signedDocs(contrat){
    return () => {
        var fiche_client = window.jsx['FichierClientView'];

        if(contrat && fiche_client){
            fiche_client.signedDevisContrat(contrat);
        }
    }
}

function getTacheStatutByCode(tache_statut){
    if(tache_statut && TACHE_STATUT[tache_statut]){
        return TACHE_STATUT[tache_statut];
    }

    return null;
}


function getTacheStatut(contrat){
    var key = null;

    if(contrat && contrat.tacheStatut){
        key = contrat.tacheStatut
    }
    else if(contrat && contrat.tache_statut){
        key = contrat.tache_statut
    }

    if(TACHE_STATUT[key]){
        return TACHE_STATUT[key];
    }

    return TACHE_STATUT['a_finaliser'];
}

function createCreneauDeuxRoues(form) {
    var data = {
        user_id: window.user.id,
        contrat_id: form.id
    }
    //create or update surbrillance contrat
    var info = {
        gestionnaire_id : window.user_id_surbriller,
        contrat_id : form.id,
        user_id: window.user.id,
    };
    changeStatusAndCreateTodo(data,(result) => {
        sendRequestSurbrillance(info, () => {
            var {loadFromDeuxRoues} = getHelperData().fichierClientConfig
            window.clikLinkDevis=false;
            if(loadFromDeuxRoues){
                loadFromDeuxRoues(contentShowModalDevis,form)
            }
        })
    });
}

function getTypologie(contrat){
    return contrat.typologie;
}

function isTodoTypologie(contrat){
    return (
        contrat.eventTelcoEnergie && 
        contrat.eventTelcoEnergie.event_id
    );
}

function getConstTacheStatut() {
    return TACHE_STATUT
}

export {
    showModalDevis,
    showRobotModal,
    showModalFormule,
    showModalAppel,
    showModalAppelInoCx,
    showModalAppelStatut,
    showModalReplanifierRdv,
    showModalTelechargerDevis,
    showModalSignature,
    showModalAppelSuivi,
    showModalResilier,
    showModalResilierContrat,
    showModalGarantie,
    showModalDispositions,
    showModalCarteVerte,
    showModalRecupererDocs,
    getTacheStatut,
    getTacheStatutByCode,
    priseRendezVousReplanifier,
    createCreneauDeuxRoues,
    contentShowModalDevis,
    getTypologie,
    isTodoTypologie,
    getConstTacheStatut,
    showModalPrendreRdvBemove,
    showModalBalioriserContrat
}
