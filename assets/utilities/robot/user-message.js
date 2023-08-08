import { v2RobotModalAxa } from "modules/v2/balio-robot/js/functions.js";
import {
	v2RobotStart,
	v2RobotLoad,
} from "modules/v2/balio-robot/js/functions.js";
import { v2RobotModal } from "modules/v2/balio-robot/js/functions.js";
import { setPing } from "tools/communication/ws/WsObject";

var { getData: getUserDataRobot } = require("utilities/robot/startUser.js");

var { startUser, getUserKey } = require("utilities/robot/startUser.js");
var {
	getConfig: getConfigBell,
} = require("module/v2/gestionnaire/test/notification/bell/main.js");
var { v2UpgradeNotification } = require("utilities/robot/inFunctions.js");

var keyUser = getUserKey();

var variables = {
	axaIsFree: false,
};

function getVariable() {}

function messageForUserRobot(data) {
	if (!data) {
		return false;
	}
	if (data.type == "direct-axa-free-response") {
		return true;
	}
	if (data.type == "send-image-base64-axa") {
		return true;
	}
	if (data.type == "action-send-image-base64-axa") {
		return true;
	}
	if (data.type == "action-send-axa-success") {
		return true;
	}
	if (data.type == "action-send-axa-failure") {
		return true;
	}
	if (data.type == "axa-is-free") {
		return true;
	}
	if (data.type == "auth-axa-is-ok") {
		return true;
	}
	if (data.type == "auth-axa-is-ok") {
		return true;
	}
	if (data.type == "require-notification-reload") {
		return true;
	}
	if (data.type == "got-info-reload-modal") {
		return true;
	}
	if (data.type == "ping") {
		return true;
	}
	return false;
}

function handleRobot(message, response) {
	var result = false;
	if (message == "action-send-image-base64-axa") {
		recieveBase64Image(response);
		return true;
	} else if (message == "action-send-axa-success") {
		receiveSuccess(response);
		return true;
	} else if (message == "action-send-axa-failure") {
		receiveFailure(response);
		return true;
	} else if (message == "direct-axa-free-response") {
		handleDirectAxaIsFreeResponse(response);
		return true;
	}  else if (message == "ping") {
		handlePing(response);
		return true;
	} 
	return result;
}

function handlePing(response){
	setPing(response.id, response.name)
}

function handleDirectAxaIsFreeResponse(response) {
	getUserDataRobot().axaIsFree = response.axaIsFree;
	getUserDataRobot().update();
}

function directAxaIsFreeSuccess(response) {
	//TODO enable all buttons linked to axa starting
	//Think about the first checking
}
function directAxaIsFreeFailure(response) {
	//TODO disable all buttons linked to axa starting
}

function receiveSuccess(response) {
	var { notification } = getUserDataRobot();
	var { sujet } = notification;
	var { user } = sujet;
	v2RobotModalAxa("success", {
		user: user,
		image: getUserDataRobot().base64,
        "contrat": notification.sujet.contra
	});

	var { processData } = getUserDataRobot();
	if (!processData) {
		return false;
	}
	var { user_id, contrat_id } = processData;
	v2RobotStart(contrat_id, 'axa', () => {
		v2RobotLoad(contrat_id);
	});
}

function receiveFailure(response) {
	var { notification } = getUserDataRobot();
	var { sujet } = notification;
	var { user } = sujet;
	var { erreur=null } = response;

	v2RobotModalAxa("failed", {
		user: user,
		image: getUserDataRobot().base64,
        "contrat": notification.sujet.contra,
		erreur: erreur
	});
}

function recieveBase64Image(response) {
	var { notification } = getUserDataRobot();
	var { sujet } = notification;
	var { user } = sujet;
	getUserDataRobot().base64 = response.base64;
	v2RobotModalAxa("typing", {
		user: user,
		image: getUserDataRobot().base64,
        "contrat": notification.sujet.contra
	});
}

function handleUserMessage(type, response) {
	//Message asking to reload the contrat data
	console.log("recieve message", response);
	//getUserDataRobot().wsIndex = getUserDataRobot().wsIndex + 1
	if (handleRobot(type, response)) {
		return true;
	}
	if (type == "axa-is-free") {
		v2handleAxaIsFree(response);
		return false;
	}
	if (type == "require-notification-reload") {
		v2RequireNotificationReload(response);
		return false;
	}
	if (type == "got-info-reload-modal") {
		
		if(
			($("#LancerRobotModal").data('bs.modal')?._isShown) && 
			window.opened_robot_modal_contract_id==response.data.contrat_id
			) {
				v2RobotModal(response.data.contrat_id);
		}
		
		return true;
	}
	
}

function v2handleAxaIsFree(response) {
	console.log("axa is free response", response);
	var { data } = response;
	var { notification } = data;
	var { content } = data;
	var { id } = notification;

	getUserDataRobot().axaContentUid = content;

	v2UpgradeNotification(notification.id, () => {
		getConfigBell().load(() => {
			setTimeout(()=>{
				getConfigBell().showModal = true;
				getConfigBell().instance.update();
			}, 500)
		});
	});
}

function v2RequireNotificationReload(response) {
	getConfigBell().load(() => {
		//getConfigBell().showModal = true;
		getConfigBell().instance.update();
	});
}

export {
	handleUserMessage,
	messageForUserRobot,
	receiveSuccess,
	receiveFailure,
	handleDirectAxaIsFreeResponse,
};
