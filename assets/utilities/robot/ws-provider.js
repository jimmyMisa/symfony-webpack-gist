import { getWs } from "tools/communication/ws/WsObject";

var provided = {};
var wsObject = null;

function wsProvide(then, key) {
	var wsObject = null
	if (!getProvided()[key]) {
		getProvided()[key] = true;
		wsObject = provideWsAction(then, key);
		return wsObject;
	}
	wsObject = getWs(key)
	then(wsObject);
	return wsObject;
}

function provideWsAction(then, key) {
	wsObject = getWs(key);
	wsObject.url = window.ws_robot;
	then(wsObject);
	return wsObject;
}

function getProvided(){
	if(!window.privateProvided){
		window.privateProvided = provided;
	}
	return window.privateProvided;
}

export { wsProvide };
