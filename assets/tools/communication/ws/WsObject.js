import {Random} from 'plugins/random/Random.js'

var pings = {}

function setPing(id, parentParam){
	if(!parentParam){
		parentParam = 'default'
	}
	if(!pings[parentParam]){
		pings[parentParam] = {}
	}
	pings[parentParam][id] = true
}

function getPing(id, parentParam){
	if(!parentParam){
		parentParam = 'default'
	}
	if(!pings[parentParam]){
		pings[parentParam] = {}
	}
	return pings[parentParam][id]
}

class WsObject {
	url;
	events;
	ws;
	ready;
	closed;
	constructor() {
		this.events = {
			onMessage: (data) => {},
			onError: (event) => {},
			onClose: (event) => {},
			onOpen: (event) => {},
			any: (event) => {},
			onStart: (event) => {},
		};
		this.ready = false;
	}
	useInstance(then) {
		if (this.ready) {
			then(this.ws, this);
		} else {
			this.events.onStart = (message) => {
				then(this.ws, this, message);
			};
			this.connect();
		}
	}
	send(data) {
		var { ws } = this;
		ws.send(JSON.stringify(data));
	}
	ping(key,author, then){
		var run = () =>{
			setTimeout(() =>{
				var id = Random.generateToken()
				var failure = false
				var { ws } = this;
				try{
					ws.send(JSON.stringify([
						{
							type: "notify",
							key: key,
							message: json_encode({
								type: "ping",
								id: id,
								author: author,
							}),
						},
					]));
				}
				catch(e){
					failure = true
				}
				setTimeout(() =>{
					then(pings, id)
				}, 5000)
			}, 1000)
		}
		if(this.closed){
			this.ws = null
			this.connect()
			setTimeout(() =>{
				run()
			}, 5000)
		}
		else{
			setTimeout(() =>{
				run()
			}, 5000)
		}
	}
	connect() {
		if (this.ws) {
			return false;
		}
		console.log(this.url);
		var ws = new WebSocket(this.url);
		this.ws = ws;
		this.closed = false;
		ws.onmessage = (message) => {
			if (message.data) {
				this.events.onMessage(message.data, message);
			}
			this.events.any(message);
		};
		ws.onopen = (event) => {
			this.events.onOpen(event, ws);
			this.ready = true;
			this.events.onStart(event);
			this.events.any(event);
		};
		ws.onerror = (event) => {
			this.closed = true;
			this.events.onError(event);
			this.events.any(event);
		};
		ws.onclose = (event) => {
			this.closed = true;
			this.events.onClose(event);
			this.events.any(event);
		};
		return true;
	}
}

var instances = {};

function getWs(key) {
	if (!key) {
		key = "default";
	}
	if (!getInstances()[key]) {
		getInstances()[key] = new WsObject();
	}
	return getInstances()[key];
}

function getInstances(){
	if(!window.privateInstances){
		window.privateInstances = instances;
	}
	return window.privateInstances;
}

export { WsObject, getWs,setPing, getPing };
