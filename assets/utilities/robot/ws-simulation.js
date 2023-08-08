import { wsProvide } from "utilities/robot/ws-provider.js";

import { v2RobotModalAxa } from "modules/v2/balio-robot/js/functions.js";

var { start: startRobot } = require("utilities/robot/start.js");
var {
	start: startUser,
	getUserKey,
	getData: getUserDataRobot,
} = require("utilities/robot/startUser.js");
var {
	getConfig,
} = require("module/v2/gestionnaire/test/notification/bell/main.js");

var {
	setCurrentContratId,
	getAction,
} = require("utilities/robot/robot-ws-helper.js");
var {
	checkIfAxaProcessIsFree,
	launchAxa,
} = require("utilities/robot/outFunctions.js");
var { v2askAuthAxaGestionnaire } = require("utilities/robot/inFunctions.js");

window.v2RobotSimulateLoad = v2RobotSimulateLoad;
window.getConfigBell = getConfig;
window.getUserDataRobot = getUserDataRobot;
window.v2askAuthAxaGestionnaire = v2askAuthAxaGestionnaire;
window.v2RobotModalAxa = v2RobotModalAxa;
window.launchAxa = launchAxa;

window.testFunction = () => {
	v2RobotSimulateUser();
};
/*
window.getConfigBell().toggleNotificationList()
window.getConfigBell().load(() =>{
	window.getConfigBell().showModal = true
	window.getConfigBell().instance.update();
	window.v2RobotSimulateLoad()
})
*/

var key = "base";
var keyUser = getUserKey();

function v2RobotSimulateLoad(contrat_id) {
	startRobot(() => {
		wsProvide(provideAction(contrat_id), key);
	}, key);
}

function v2RobotSimulateUser() {
	startUser(() => {
		//wsProvide(provideAction(contrat_id), keyUser);
		userProcess();
	}, keyUser);
}

function userProcess() {
	/*window.getConfigBell().toggleNotificationList()
	window.getConfigBell().load(() =>{
		window.getConfigBell().showModal = true
		window.getConfigBell().instance.update();
		
	})*/
	v2askAuthAxaGestionnaire(
		"e379c528-0c71-11eb-9f75-fa163ef39868",
		"8328824c-fef1-4f78-9a22-1a67e7d1387f"
	);
}

function provideAction(contrat_id) {
	setCurrentContratId(contrat_id);
	$("#LancerRobotModal").modal("show");
	getAction()["reloadAction"] = (data) => {
		console.log(data);
	};
	return (wsObject) => {
		wsObject.useInstance((ws) => {
			wsObject.send([
				{
					type: "notify",
					key: "balio-front",
					message: json_encode({
						type: "request-started",
						contrat_id: "",
					}),
				},
			]);
		});
	};
}

export { v2RobotSimulateLoad, v2RobotSimulateUser };
