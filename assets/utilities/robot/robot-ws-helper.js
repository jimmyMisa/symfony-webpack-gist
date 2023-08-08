import {
	v2RobotStart,
	v2RobotCorrectLoad,
} from "modules/v2/balio-robot/js/functions.js";
import {
	handleDirectAxaIsFreeResponse
} from "utilities/robot/user-message.js";

var currentContratId = null;
var actions = {};

function getCurrentContratId() {
	return currentContratId;
}
function setCurrentContratId(id) {
	currentContratId = id;
}

//When using modal, use this config,
//then it will allow to configure it as needed
//according to API calls
var robotModalConfig = {};

function getRobotModalConfig() {
	return robotModalConfig;
}
function setRobotModalConfig(config) {
	robotModalConfig = config;
}

//action helper
var action = {};

function getAction() {
	return action;
}
function setAction(act) {
	action = act;
}

function messageForRobot(data) {
	if (!data) {
		return false;
	}
	if (data.type == "robot-changed") {
		return true;
	}
	if (data.type == "request-started") {
		return true;
	}
	if (data.type == "step-changed") {
		return true;
	}
	if (data.type == "request-changed") {
		return true;
	}
	if (data.type == "robot-changed") {
		return true;
	}
	if (data.type == "request-started-test") {
		return true;
	}
	if (data.type == "direct-axa-free-response") {
		return true;
	}
	return false;
}

function handleMessage(message, response) {
	//Message asking to reload the contrat data
	console.log('global message', response)
	if(message == "direct-axa-free-response"){
		handleDirectAxaIsFreeResponse(response)
		return true
	}
	reloadContratData();
}

function reloadContratData() {
	//Nothing to do if no current contrat id
	if (currentContratId) {
		//According to the current contrat id, reload the modal
		v2RobotCorrectLoad(currentContratId, getActionByKey("reloadAction"));
	}
}

function getActionByKey(key) {
	if (getAction()[key]) {
		return getAction()[key];
	}
}

export {
	getCurrentContratId,
	setCurrentContratId,
	getRobotModalConfig,
	setRobotModalConfig,
	getAction,
	setAction,
	messageForRobot,
	handleMessage,
};
