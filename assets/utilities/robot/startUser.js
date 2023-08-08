import { wsProvide } from "utilities/robot/ws-provider.js";
import {
	messageForUserRobot,
	handleUserMessage,
} from "utilities/robot/user-message.js";
import {
	v2RobotModal,
	v2RobotModalAxa,
} from "modules/v2/balio-robot/js/functions.js";

var { directAxaIsFree } = require("utilities/robot/outFunctions.js");

var started = {};
var data = {
	update: () => {
		var modalRobot = v2RobotModal();
		var modalRobotAxa = v2RobotModalAxa();
		if (modalRobot) {
			modalRobot.update();
		}
		if (modalRobotAxa) {
			modalRobot.update();
		}
	},
	robbotModalExecutionIndex: 0,
};

function getData() {
	if(window.robotGData){
		return window.robotGData;
	}
	window.robotGData = data;
	return window.robotGData;
}

function getUserKey() {
	return "user";
}

function start(then, key, onError = () =>{}) {
	if (!then) {
		then = () => {};
	}
	if (started[key]) {
		started[key] = false;
		then();
		return true;
	}
	var instance = wsProvide((wsObject) => {
		wsObject.events.onError = onError
		wsObject.events.onOpen = (event) => {
			var { ws } = wsObject;
			ws.send(
				JSON.stringify([
					{
						type: "configure",
						key: "user-" + window.app_user_connected_id,
						value: window.app_user_connected_id,
					},
				])
			);
			setTimeout(() =>{
				directAxaIsFree();
			}, 200)
		};
		wsObject.events.onMessage = (content) => {
			var data = json_decode(content);
			if (data) {
				onMessage(data);
			}
		};
		wsObject.useInstance((ws) => {
			then();
		});
	}, key);
	return instance
}

function onMessage(data) {
	if (messageForUserRobot(data)) {
		console.log(data);
		handleUserMessage(data.type, data);
	}
}

export { start, getUserKey, getData };
