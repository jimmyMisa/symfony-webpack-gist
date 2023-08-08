import { getJsxInstance } from "utilities/v2/v2-utilities.js";

function runCallInoCx(params, then){
    var data = json_encode(params);
    $.ajax({
        method: "POST",
        url: window.admin_ino_cx_telecom_run,
        data: data,
        dataType: 'json',
    }).always(then);
}

/*
    Call ModalsView.jsx::startInoCxCall function
*/
function startInoCxCall(params, then){
    var modals_view = window.jsx['ModalsView'];

    if(modals_view){
        modals_view.startInoCxCall(params);
    }
}

function showModalInoCxStatus(params, then){
    // Opening the modal call directly to Ino Cx API
    // Modal to define the call situation (call to API success or fail)
    var modalInoCxStatus = getJsxInstance("modalInoCxStatus")
    modalInoCxStatus.showModal(params, then)
}

export { 
    runCallInoCx,
    startInoCxCall,
    showModalInoCxStatus
}