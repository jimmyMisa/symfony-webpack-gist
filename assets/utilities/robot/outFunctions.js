import { wsProvide } from "utilities/robot/ws-provider.js";
import { getEtatRobot } from "modules/v2/layout/main.js";
import { getPing } from "tools/communication/ws/WsObject";
var { receiveFailure } = require("utilities/robot/user-message.js");
var axa_auth_start_delai = window.AXA_AUTH_START_DELAI * 1000;
var axa_auth_process_delai = window.AXA_AUTH_PROCESS_DELAI * 1000;

var {
	start: startUser,
	getUserKey,
	getData: getUserDataRobot,
} = require("utilities/robot/startUser.js");
var { start: startGestionnaire } = require("utilities/robot/start.js");

var keyUser = getUserKey();

if (getUserDataRobot() && !getUserDataRobot().started && window.use_robot_ping!==false) {
	getUserDataRobot().started = true;
	startGestionnaire(() => {
		wsProvide(userProcess);
		function userProcess(wsObject) {
			console.log("ws global started");
		}
	});
	var instanceUser = startUser(() => {
		console.log("ws user started");
	}, keyUser);
	getEtatRobot().pingUser = (then = () =>{}, isLoop) =>{
		if(!isLoop){
			getEtatRobot().status = "chargement"
			getEtatRobot().refresh()
		}
		var author = 'user-' + window.app_user_connected_id
		var extension = 'extension';
		var assistant = 'assistant';
		instanceUser.ping(author,author,(pings, id) =>{
			var status = getPing(id)
			status = status ? true : false
			console.log('ping status',status)
			getEtatRobot().setStatus(status)
			getEtatRobot().refresh()
			
			instanceUser.ping(assistant,author,(pings, id) =>{
				var status = getPing(id, 'assistant')
				status = status ? true : false
				console.log('ping status',status)
				getEtatRobot().setStatus(status, 'assistant')
				getEtatRobot().refresh()
			
				instanceUser.ping(extension,author,(pings, id) =>{
					var status = getPing(id, 'extension')
					status = status ? true : false
					console.log('ping status',status)
					getEtatRobot().setStatus(status, 'extension')
					getEtatRobot().refresh()
					then()
				})
			})
		})
	}
	getEtatRobot().ping(true)
}

//Check is axa process is free
function checkIfAxaProcessIsFree() {
	var author_id = window.app_user_connected_id;

	startUser(() => {
		webSocketInstance.send(
			JSON.stringify([
				{
					type: "notify",
					key: "extension",
					message: json_encode({
						info: "direct-axa-free",
						data: {
							author_id: author_id,
						},
					}),
				},
			])
		);
	}, keyUser);
}

function directAxaIsFree() {
	startUser(() => {
		wsProvide(userProcess, keyUser);
	}, keyUser);

	function userProcess(wsObject) {
		wsObject.useInstance((ws) => {
			wsObject.send([
				{
					type: "notify",
					key: "extension",
					message: json_encode({
						info: "direct-axa-free",
						data: {
							author_id: window.app_user_connected_id,
						},
					}),
				},
			]);
		});
	}
}

function launchAxa(then) {
	startUser(() => {
		wsProvide(userProcess, keyUser);
	}, keyUser);

	function userProcess(wsObject) {
		var index = getUserDataRobot().robbotModalExecutionIndex;
		wsObject.useInstance((ws) => {
			wsObject.send([
				{
					type: "notify",
					key: "extension",
					message: json_encode({
						info: "launch-axa",
						data: {
							author_id: window.app_user_connected_id,
							content: getUserDataRobot().axaContentUid,
							contrat_id: window.app_robot_contrat_id
						},
					}),
				},
			]);
			if (then) {
				then();
			}
			setTimeout(() => {
				if (index == getUserDataRobot().robbotModalExecutionIndex) {
					receiveFailure();
				}
			}, axa_auth_start_delai);
		});
	}
}

function v2RefreshExtranet(extranetCode, then) {
	var instance = startUser(() => {
		wsProvide(userProcess, keyUser);
	}, keyUser);

	function userProcess(wsObject) {
		wsObject.useInstance((ws) => {
			wsObject.send([
				{
					type: "notify",
					key: "extension",
					message: json_encode({
						info: "refresh",
						data: {
							extranetCode: extranetCode,
						},
					}),
				},
			]);
			if (then) {
				then();
			}
		});
	}
}

function v2Reboot(then = () =>{}) {
	var instance = startUser(() => {
		wsProvide(userProcess, keyUser);
	}, keyUser);

	function userProcess(wsObject) {
		wsObject.useInstance((ws) => {
			wsObject.send([
				{
					type: "notify",
					key: "assistant",
					message: json_encode({
						info: "killall_processes",
						data: {},
					}),
				},
			]);
			if (then) {
				then();
			}
		});
	}
}

function v2handleImageAuthAxaSubmititingWs() {
	var author_id = window.app_user_connected_id;
	var input_login_value = $("[name='input_login_value']").val();

	var { notification } = getUserDataRobot();
	var { sujet } = notification;
	var { user } = sujet;

	v2RobotModalAxa(
		"waiting",
		{
			user: user,
			image: getUserDataRobot().base64,
		},
		(modal) => {
			modal.config.isDisabled = true;
		}
	);

	startUser(() => {
		wsProvide(userProcess, keyUser);
	}, keyUser);

	function userProcess(wsObject) {
		var index = getUserDataRobot().robbotModalExecutionIndex;
		wsObject.useInstance((ws) => {
			wsObject.send([
	            {
	                type: "notify",
	                key: "extension",
	                message: json_encode({
	                    info: "got-axa-code",
	                    data: {
	                        author_id: author_id,
	                        coords: getUserDataRobot().mdpCoords,
							input_login_value: input_login_value
	                    },
	                }),
	            },
	        ]);
			setTimeout(() => {
				if (index == getUserDataRobot().robbotModalExecutionIndex) {
					receiveFailure();
				}
			}, axa_auth_process_delai);
		});
	}
}

export {
	checkIfAxaProcessIsFree,
	launchAxa,
	v2handleImageAuthAxaSubmititingWs,
	directAxaIsFree,
	v2RefreshExtranet,
	v2Reboot,
};
