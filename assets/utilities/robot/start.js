import { wsProvide } from "utilities/robot/ws-provider.js";
import {
	messageForRobot,
	handleMessage,
} from "utilities/robot/robot-ws-helper.js";

var started = {};

function start(then, key) {
	if (!then) {
		then = () => {};
	}
	if (started[key]) {
		started[key] = false;
		then();
		return true;
	}
	wsProvide((wsObject) => {
		wsObject.events.onOpen = (event) => {
			var { ws } = wsObject;
			ws.send(
				JSON.stringify([
					{
						type: "configure",
						//key: "balio-front",
						key: "gestionnaire-interface",
						value: "is good",
					},
				])
			);
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
}

function onMessage(data) {
	if (messageForRobot(data)) {
		handleMessage(data.type, data);
	}
}

export { start };
