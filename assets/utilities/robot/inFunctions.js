import {
    v2RobotStart,
    v2RobotLoad,
    v2RobotRequest,
    v2RobotModalAxa,
} from "modules/v2/balio-robot/js/functions.js";

var { launchAxa } = require("utilities/robot/outFunctions.js");

var { getData: getUserDataRobot } = require("utilities/robot/startUser.js");

var index = null;
var robotModalComponentConfig = null;

function v2startAxaAuthentification() {
    var { notification } = getUserDataRobot();
    var { sujet } = notification;
    var { user, contra = {} } = sujet;
    var { id = null } = contra;
    console.log("sujet", sujet);
    window.app_robot_contrat_id = id;
    
    v2RobotModalAxa("loading", {
        user,
        image: null,
        "contrat": notification.sujet.contra
    });
    launchAxa();
}

function v2askAuthAxa(user_id, author_id, contra_id) {
    var url = window.api_balio_robot_request_ask_auth_axa_data;
    var data = {
        user_id: user_id,
        author_id: author_id,
        owner_id: author_id,
        contra_id: contra_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: {
            data: json_encode(data),
        },
        success: function(result) {
            // console.log(result.message);
        },
    });
}
function v2UpgradeNotification(notification_id, then) {
    if (!then) {
        then = () => {};
    }
    var url = window.v2_api_upgrade_notification;
    var data = {
        notification_id: notification_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: {
            data: json_encode(data),
        },
    }).always(then);
}

function v2askAuthAxaGestionnaire(user_id, contra_id) {
    return v2askAuthAxa(user_id, window.app_user_connected_id, contra_id);
}

export {
    v2askAuthAxa,
    v2askAuthAxaGestionnaire,
    v2UpgradeNotification,
    v2startAxaAuthentification,
};
