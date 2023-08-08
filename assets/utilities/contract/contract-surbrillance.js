import {json_encode} from 'utilities/functions/json_encode.js';

function sendRequestSurbrillance(data, then){
    if (!then) {
        then = () => {};
    }
    var content = json_encode(data);
    $.ajax({
        method: 'POST',
        url: window.v2_api_surbrillance_contrat,
        data: content,
        dataType: 'json',
    })
    .always(function(result) {
        then()
    })
}

function setSurbrillancePlateforme(contrat_id) {
    classSurbriller(contrat_id, true)
    setTimeout(()=> {
        classSurbriller(contrat_id)
    },5000)
}

function classSurbriller(contrat_id, isAdd=false) {
    $("._group_list ._body_group_list ._bloc_list_valid").each(function (index,item) {
        var surbrillerid = $(item).attr('data-surbrillerid');
        if (isAdd && contrat_id == surbrillerid) {
            $(item).addClass("surbriller_contrat_plateforme")
        }
        else if (contrat_id == surbrillerid) {
            $(item).removeClass("surbriller_contrat_plateforme")
        }
    })
}

export {
    sendRequestSurbrillance,
    setSurbrillancePlateforme,
}
