import {json_encode} from 'utilities/functions/json_encode.js';

//Crm
function cancelRdvCreneau(data, then, contacterBalio=false){
    if (!then) {
        then = () => {};
    }
    var url = window.v2_api_creneau_cancel;
    if (contacterBalio) {
        url = window.v2_api_utilisateur_cancel_contacterbalio;
    }
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: url,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then(result)
    })
}

function cancelTache(data, then){
    if (!then) {
        then = () => {};
    }
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: window.v2_api_tache_cancel,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then(result)
    })
}

function showModalAnnulationRdv(contrat,client_info){
    var modal_annulation = window.jsx['ModalAnnulationRdvCrm'];
    if(contrat && modal_annulation){
        modal_annulation.setContrat(contrat);
        modal_annulation.setInfoClient(client_info);
        modal_annulation.toggleModal(true);
    }
}


function showModalModificationRdv(contrat,client_info){
    var modal_modification = window.jsx['ModalModificationRdvCrm'];
    if(contrat && modal_modification){
        modal_modification.setContrat(contrat);
        modal_modification.setInfoClient(client_info);
        modal_modification.toggleModal(true);
        setTimeout(() => {
            modal_modification.loadCreneaux()
        },300)
    }
}


function showModalTaskRdv(task){
    var modal_add_task = window.jsx['AddTaskModal'];
    if(task && modal_add_task){
        modal_add_task.setInfoClient(task);
        modal_add_task.show();
    }
}

function modalAnnulationRdvCalendar(contrat,client_info){
    var modal_annulation = window.jsx['ModalAnnulationRdvCalendar'];
    if(contrat && modal_annulation){
        modal_annulation.setContrat(contrat);
        modal_annulation.setInfoClient(client_info);
        modal_annulation.toggleModal(true);
    }
}


function modalModificationRdvCalendar(contrat,client_info){
    var modal_modification = window.jsx['ModalModificationRdvCalendar'];
    if(contrat && modal_modification){
        modal_modification.setContrat(contrat);
        modal_modification.setInfoClient(client_info);
        modal_modification.toggleModal(true);
        setTimeout(() => {
            modal_modification.loadCreneaux()
        },300)
    }
}


function taskModalCalendar(task){
    var modal_add_task = window.jsx['TaskModalCalendar'];
    if(task && modal_add_task){
        modal_add_task.setInfoClient(task);
        modal_add_task.show();
    }
}

//Plateforme
function getMesRendezVousListes(content,then){
    content = json_encode(content);
    $.ajax({
        method: "POST",
        url: window.v2_api_utilisateur_list_mes_rendez_vous,
        data : content
    }).always(
        function(result) {
            if(result && result.status && result.status == 200){
                then(result);
            }
            else {
                then({
                    status: 500,
                })
            }
        }
    );
}
function cancelDoubleRdvCreneauPlateforme(data, then){
    if (!then) {
        then = () => {};
    }
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: window.v2_api_utilisateur_cancel_contrats,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then(result)
    })
}

//Crm
function cancelRdvCreneauTelcoEnergie(data, then){
    if (!then) {
        then = () => {};
    }
    var url = window.api_cancel_creneau_telco_energie;
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: url,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then(result)
    })
}

function pageCancelRdvCreneauTelcoEnergie(data, then){
    if (!then) {
        then = () => {};
    }
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: window.api_cancel_creneau_contrats_telco_energie,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then(result)
    })
}

export {
    cancelRdvCreneau,
    showModalAnnulationRdv,
    showModalModificationRdv,
    showModalTaskRdv,
    modalAnnulationRdvCalendar,
    modalModificationRdvCalendar,
    taskModalCalendar,
    cancelTache,
    getMesRendezVousListes,
    cancelDoubleRdvCreneauPlateforme,
    pageCancelRdvCreneauTelcoEnergie,
    cancelRdvCreneauTelcoEnergie,
}
