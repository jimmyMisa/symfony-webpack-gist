import { WsObject } from "./WsObject.js";

var wsInstances = {};

function sendJsonMessage({ wsObject, key, data }) {
	var message = json_encode(data);
	sendMessage({ wsObject, key, message });
}

function sendMessage({ wsObject, key, message }) {
	wsObject.useInstance((ws) => {
		ws.send(
			json_encode([
				{
					type: "notify",
					key: key,
					message: message,
				},
			])
		);
	});
}
function getWsExtended({ url, onReady, onMessage, events, key, value, id }) {
	if (!onReady) {
		onReady = () => {};
	}
	if (wsInstances[id]) {
		wsInstances[id].useInstance((ws) => {
			onReady(ws);
		});
	} else {
		wsInstances[id] = configureWs({
			url,
			onReady,
			onMessage,
			events,
			key,
			value,
		});
	}
	return wsInstances[id];
}
function treatMessage(message) {
	return json_decode(message);
}
function configureWs({ url, onReady, onMessage, events, key, value }) {
	var wsObject = new WsObject();
	if (!onMessage) {
		onMessage = () => {};
	}
	if (!onReady) {
		onReady = () => {};
	}
	if (!events) {
		events = {};
	}
	wsObject.url = url;
	Object.keys(events).map((eventName) => {
		var eventFunction = events[eventName];
		wsObject.events[eventName] = eventFunction;
	});
	wsObject.events.onMessage = (message) => {
		var data = treatMessage(message);
		onMessage(data, message);
	};
	wsObject.useInstance((ws) => {
		ws.send(
			json_encode([
				{
					type: "configure",
					key: key,
					value: value ? value : "1.0",
				},
			])
		);
		onReady(wsObject);
	});
	return wsObject;
}

export { getWsExtended, sendMessage, sendJsonMessage };
