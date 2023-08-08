import { getCall, joinCall, startCall, hangupedCall, transfertType, hangupFromCall, toggleOverlay, formatPhoneNumber, toggleTargetBlank, toggleAppelEncoursModal, toggleAppelEntrantModal, toggleAppelEchecModal } from "utilities/appel/appel-utilities.js";
import { getWsExtended, sendJsonMessage } from "tools/communication/ws/WsObjectExtended.js";
import { Random } from "plugins/random/Random";

var getUserId = () =>{
	var {gestionnaire = {}} = window
	var {id = null} = gestionnaire
	return id
}

const WS_URL = window.appel_ws;

const ID_USER = getUserId();

const KEY_USER = idToKey(ID_USER);

const KEY_ALL = 'all-connexion-key';
const KEY_SYSTEM = 'system-connexion-key';

const APPEL_SORTANT = 'appel-sortant';
const APPEL_ENTRANT = 'appel-entrant';

var appelData = {};
window.appelData = appelData

function getAppelData(key){
    return (key ? appelData[key] : appelData);
}

function resetAppelData(){
	appelData.appel = null;

	setDisponible(true);
	toggleTargetBlank(false);
}

function setType(type){
	if(appelData.appel){
		appelData.appel.type = type;
	}
}

function getClient(){
	if(appelData.appel){
		return appelData.appel.client
	}
	return null;
}

function setClient(client){
	if(appelData.appel){
		appelData.appel.client = client;
	}
}

function setBemove(invited, accept){
	if(appelData.appel){
		appelData.appel.bemove = {
			accept: accept,
			invited: invited,
			numero: formatPhoneNumber(
				window.bemove.phone
			)
		};
	}
}

function getBemove(){
	var appel = appelData.appel;
	if(appel && appel.bemove){
		return appel.bemove
	}
	return {};
}

function addNumero(numero){
	var appel = appelData.appel;
	var num = {
		invited: true,
		numero: numero,
	}

	if(getNumeros(numero).length){
		appel.numeros = appel.numeros.filter((num) => (
			num.numero != numero
		))
	}

	if(appel && appel.numeros){
		appel.numeros.push(num);
	}
	else if(appel){
		appel.numeros = [num];
	}
}

function setNumero(numero, accept){
	var num = getNumeros(numero);
	num.accept = accept;
}

function getNumeros(numero, jitsi, invited){
	var appel = appelData.appel;
	if(appel && appel.numeros){
		if(invited){
			var result = [];
			appel.numeros.map((num, index) => {
				if(num.invited === true){
					result.push(appel.numeros[index]);
				}
			})
			return result;
		}
		else if(numero || jitsi){
			var result = null;
			appel.numeros.map((num, index) => {
				if((num.numero == numero) || (jitsi && num.jitsi == numero)){
					result = appel.numeros[index];
				}
			})
			return result;
		}
		else {
			return appel.numeros;
		}
	}
	return [];
}

function getCalled(){
	var invitees = getInvitees();
	var invitees_keys = Object.keys(invitees);

	if(invitees_keys.length){
		return invitees[invitees_keys[0]];
	}
	return {};
}

function getInvited(){
	var user = null;
	var appel = appelData.appel
	if(appel && appel.invitees){
		Object.keys(appel.invitees).map((id) => {
			var conseiller = appel.invitees[id];
			if(conseiller.invited && conseiller.accept){
				user = conseiller
			}
		})
	}
	return user;
}

function countInvitees(invited, accept){
	var invitees = getInvitees();

	if(invited && accept){
		return Object.keys(invitees).filter((id) => (
			invitees[id].invited && invitees[id].accept
		)).length
	}
	else if(invited){
		return Object.keys(invitees).filter((id) => (
			invitees[id].invited === true && invitees[id].accept !== false
		)).length
	}
	else if(accept){
		return Object.keys(invitees).filter((id) => (
			invitees[id].accept === true
		)).length
	}
	return 0;
}

function getInvitees(only_accept){
	if(appelData.appel && appelData.appel.invitees){
		if(only_accept){
			var invitees = appelData.appel.invitees;
			return Object.fromEntries(Object.entries(invitees).filter(([id, conseiller]) => (
				conseiller.invited && conseiller.accept
			)));
		}
		return appelData.appel.invitees;
	}
	else if(appelData.appel){
		appelData.appel.invitees = {};
		return appelData.appel.invitees;
	}
	return {};
}

function updateJitsi(myJitsi, joinedJitsi){
	var appel = appelData.appel;
	if(appel && myJitsi && joinedJitsi){
		var invitees = appel.invitees;

		if(myJitsi){
			appel.jitsi = myJitsi;

			if(invitees && invitees[ID_USER]){
				invitees[ID_USER].jitsi = myJitsi;
			}
		}

		if(joinedJitsi.jitsi && invitees && invitees[joinedJitsi.id]){
			invitees[joinedJitsi.id].jitsi = joinedJitsi.jitsi;
		}
	}
}

function toMain(id){
	if(appelData.appel){
		var old_main = appelData.appel.main;
		var new_main = getGestionnaire(id);

		appelData.appel.main = new_main;

		var invitees = getInvitees();
		invitees[old_main.id] = old_main;
		invitees[old_main.id].accept = false;
		invitees[old_main.id].invited = false;

		delete invitees[new_main.id];
	}
}

function switchMain(id, force){
	if(isMain() || force){
		var me = window.gestionnaire;

		var main = getGestionnaire(id);
		appelData.appel.main = main;

		var invitees = getInvitees();
		invitees[me.id] = me;
		invitees[me.id].accept = true;
		invitees[me.id].invited = true;
		invitees[me.id].jitsi = appelData.appel.jitsi
		invitees[me.id].token = appelData.appel.token

		delete invitees[main.id];
	}
}

function inCall(is_started){
	// En cas d'utilisation de ino cx, inCall va retourner directement a false, comme l'api retournera une erreur si le gestionnaire ne peut pas effectuer un call
	return false

	if(appelData.appel){
		return is_started ? appelData.appel.started : true;
	}
	else {
		return (
			isDisponible() === false &&
			window.gestionnaire.disponible == true
		)
	}
}

function isDisponible(){
	var id = window.gestionnaire.id;
	if(appelData.disponibilities){
		return appelData.disponibilities[id];
	}
	else {
		return window.gestionnaire.disponible;
	}
}

function setDisponible(disponible){
	window.gestionnaire.disponible = disponible;
	updateDisponibilities();
}

function startAppelWS(){
	if(!appelData.ready){
		appelData.ready = true;
	
		connectAsUser();
		loadGestionnaires();
		checkNotification();
	}
}

function checkNotification(){
	if('Notification' in window){
		var permission = Notification.permission;

		if((permission !== 'granted') && (permission != 'denied')){
			Notification.requestPermission();
		}
	}
}

function startAppel(){
	if(appelData.appel){
		appelData.appel.started = true;
	}
}


function initAppelSortant(){
	if(!appelData.appel){
		setDisponible(false);
		updateDisponibilities();
		
		appelData.appel = {
			direction: APPEL_SORTANT,
			main: window.gestionnaire,
			token: Random.generateToken(),
			invitees: {},
		}
	}
}

/** ---------- ---------- ---------- Utilities ---------- ---------- ---------- */

function idToKey(id){
	return id;
}

function isMe(conseiller){
	return (
		conseiller &&
		conseiller.id == window.gestionnaire.id
	)
}

function isMain(conseiller){
	var appel = appelData.appel;
	var gestionnaire = window.gestionnaire;

	if(conseiller){
		gestionnaire = conseiller;
	}

	return (
		appel && 
		appel.main && 
		appel.main.id == gestionnaire.id
	)
}

function isAuth(conseiller, token){
	if(isMain(conseiller)){
		return true;
	}
	else {
		var invitees = getInvitees();
		var conseiller = invitees[conseiller.id] ?? null;

		return conseiller.token == token;
	}
}

/** ---------- ---------- ---------- User part ---------- ---------- ---------- */

function connectAsUser(){
    var wsObject = getWsExtended({
        url: WS_URL,
        key: KEY_USER,
        onReady: onReadyUser,
        onMessage: onMessageUser,
        events: {},
        value: "1.0",
        id: "user-connexion",
    });
    appelData.wsObject = wsObject;
    appelData.key = KEY_USER;
}

function onReadyUser() {
	connectAsAll((allwsObject) => {
        sendJsonMessage({
            wsObject: allwsObject,
            key: KEY_SYSTEM,
            data: {
                action: "checkDispoRequest",
            },
        });
	});
}

function onMessageUser(data){
	if(data){
		var { action } = {...data};
		if(action == "appelInvitationRequest"){
			appelInvitationRequest(data);
		}
		if(action == "appelInvitationResponse"){
			appelInvitationResponse(data);
		}
		if(action == "appelInvitationData"){
			appelInvitationData(data);
		}
		if(action == "appelDataUpdate"){
			appelDataUpdate(data);
		}
		if(action == "appelMainUpdate"){
			appelMainUpdate(data);
		}
		if(action == "userHangupRequest"){
			userHangupRequest(data);
		}
		if(action == "forceHangupFromCall"){
			forceHangupFromCall(data);
		}
		if(action == "cancelInvitationRequest"){
			cancelInvitationRequest(data);
		}
		if(action == "closePopupRequest"){
			closePopupRequest(data);
		}
	}
}

function appelInvitationRequest(data){
	if(data && data.main){
		appelData.appel = {
			direction: APPEL_ENTRANT,
			main: data.main,
			client: data.client,
			token: Random.generateToken(),
		}

		setDisponible(false);
		toggleAppelEntrantModal(true);
	}
}

function appelInvitationResponse(data){
	toggleAppelEncoursModal();

	var { id, token, accept } = data;
	var { invitees, type } = appelData.appel;

	if(id && invitees && invitees[id]){
		invitees[id].token = token;
		invitees[id].accept = accept;
		
		var invitation = invitees[id].invitation

		if(accept && (invitation == 'appeler_gestionnaire')){
			startCall(null, null, 'appeler_gestionnaire', (appel) => {
				sendAppelInvitationData(id , token, false, {
					user: appel.user,
					room: appel.room,
					type: appel.type,
					phone: appel.phone,
					chrono: appel.chrono,
					contrat: appel.contrat,
					gestionnaire: appel.gestionnaire,
					gestionnaire_called: appel.gestionnaire_called,
				});
			})
		}
		else if(!accept && (invitation == 'appeler_gestionnaire')){
			appelData.appel = null;
			toggleAppelEchecModal(true, invitees[id]);
		}
		else if(accept && (invitation == 'transferer_gestionnaire')){			
			getCall((appel) => {
				appel.type = transfertType(appel);
                setType(appel.type);

				sendAppelInvitationData(id , token, true, {
					user: appel.user,
					room: appel.room,
					type: appel.type,
					phone: appel.phone,
					chrono: appel.chrono,
					contrat: appel.contrat,
					gestionnaire: appel.gestionnaire,
					gestionnaire_called: appel.gestionnaire_called,
				});
			})
		}
		else if(!accept && (invitation == 'transferer_gestionnaire')){
			
		}

		refreshAll();
		sendDataUpdateForAll();
	}
}

function appelInvitationData(data){
	toggleOverlay();

	var { token, main } = appelData.appel;

	if(token && main && data && (data.token == token)){
		var params = data.data;
		var origin = data.origin;

		if(params && main.id && origin && (origin.id == main.id)){
			joinCall(data.data);
		}
	}
}

function appelDataUpdate(data){
	var { appel } = appelData;

	if(appel && data && data.data && data.origin && !isMe(data.origin)){
		var { token, jitsi, main, invitees } = appel;
		var { origin, data: params } = data;
		var invited = invitees ? invitees[origin.id] : null;

		if(token && main && origin){
			if(isMain(origin)){
				appelData.appel = params.appel;
				appelData.appel.jitsi = jitsi;
				appelData.appel.token = token;

				invitees = params.appel.invitees;

				if(!jitsi && invitees && invitees[ID_USER]){
					appelData.appel.jitsi = invitees[ID_USER].jitsi;
				}
			}
			else if(isMain() && invited && (invited.token == data.token)) {
				appelData.appel = params.appel;
				appelData.appel.jitsi = jitsi;
				appelData.appel.token = token;
				appelData.appel.main = main;

				sendDataUpdateForAll();
			}

			refreshAll();
		}
	}
}

function appelMainUpdate(data){
	var { appel } = appelData;

	if(appel && data && data.data && isAuth(data.origin, data.token)){
		if(!isMe(data.origin)){
			var { token, jitsi } = appel;
			var { data: params } = data;

			appelData.appel = params.appel;
			appelData.appel.jitsi = jitsi;
			appelData.appel.token = token;

			invitees = params.appel.invitees;

			if(!jitsi && invitees && invitees[ID_USER]){
				appelData.appel.jitsi = invitees[ID_USER].jitsi;
			}

			refreshAll();
		}
	}
}

function userHangupRequest(data){
	var { appel } = appelData;

	if(appel && data && data.hangup && data.origin){
		var invitees = getInvitees();
		var origin = invitees[data.origin.id] ? invitees[data.origin.id] : null;
		var hangup = invitees[data.hangup.id] ? invitees[data.hangup.id] : null;

		if(hangup && data.hangup.jitsi){
			hangup.jitsi = data.hangup.jitsi;
		}

		if(isMain() && (isMe(data.origin) || (origin && (origin.token == data.token)))){
			if(!isMe(hangup)){
				hangup.invited = false;
				hangup.accept = false;

				if(hangup.jitsi){
					hangupFromCall(hangup.jitsi);
				}

				sendForceHangupFromCall(hangup);
			}

			refreshAll();
			sendDataUpdateForAll();
		}
	}
}

function forceHangupFromCall(data){
	var { appel } = appelData;

	if(appel && data && isAuth(data.origin, data.token)){
		if(isMe(data.hangup)){
			hangupFromCall(null, true);
		}
	}
}

function cancelInvitationRequest(data){
	var { appel } = appelData;

	if(!appel || !appel.main || (data.main && (data.main.id == appel.main.id))){
		toggleAppelEntrantModal(false);
		resetAppelData();
	}
}

function closePopupRequest(data){
	var { token } = data;
	var { appel } = appelData;

	if(appel && (appel.token == token)){
		// nothing to do
	}
	else {
		toggleAppelEntrantModal(false);
		resetAppelData();
	}
}

function verifyAppelDisconnexion(data){
	var appel = appelData.appel;

	if(appel && data && data.disponibilities){
		var main = appel.main;
		var invitees = getInvitees();
		var disponibilities = data.disponibilities;

		if(!isMe(main) && (disponibilities[main.id] === true)){
			hangupedCall();
		}
		else if(isMain()){
			Object.keys(invitees).map((id) => {
				if(disponibilities[id] === true){
					var {invited, accept} = invitees[id];
					if((invited === true) && (accept === true)){
						invitees[id].disponible = true;
						invitees[id].invited = false;
						invitees[id].accept = false;
	
						refreshAll();
						sendDataUpdateForAll();
					}
				}
			})
		}
	}
}

/** ---------- ---------- ---------- All users part ---------- ---------- ---------- */

function connectAsAll(then){
	var allwsObject = getWsExtended({
		url: WS_URL,
		key: KEY_ALL,
		onReady: then,
		onMessage: onMessageAll,
		events: {},
		value: "1.0",
		id: "all-connexion",
	});
}

function onMessageAll(data){
	if(data){
		var { action } = {...data};
		if(action == "checkDispoClient"){
			checkDispoClient(data);
		}
		if(action == "disponibilitiesResult"){
			disponibilitiesResult(data);
			verifyAppelDisconnexion(data);
		}
	}
}

function checkDispoClient(){
	var { wsObject } = appelData;
    var { id, disponible } = window.gestionnaire;
	sendJsonMessage({
		wsObject,
		key: KEY_SYSTEM,
		data: {
			action: "checkDispoResponse",
			data: {
				id: id,
				disponible: disponible ? true : false,
			},
		},
	});
}

function disponibilitiesResult(data){
	if(!data || !data.disponibilities){
		return false;
	}
	var { disponibilities } = data;

    appelData.disponibilities = disponibilities;

	refreshAll();
	verifyGestionnaires();
}

/** ---------- ---------- ---------- ---------- ---------- ---------- ---------- */

function sendAppelInvitation(id, invitation){
	var { wsObject, appel } = appelData;

	if(appel && appel.main){
		appel.invitees[id] = getGestionnaire(id);
		appel.invitees[id].invited = true;
		appel.invitees[id].invitation = invitation;
	
		sendJsonMessage({
			wsObject,
			key: idToKey(id),
			data: {
				action: "appelInvitationRequest",
				main: appel.main,
				client: appel.client,
			},
		});

		sendDataUpdateForAll(id);
	}
}

function sendAppelInvitationResponse(accept){
	var { wsObject, appel } = appelData;
	var main = (appel ? appel.main : null);

	if(main && main.id && appel.token){
		sendJsonMessage({
			wsObject,
			key: idToKey(main.id),
			data: {
				action: "appelInvitationResponse",
				id: window.gestionnaire.id,
				token: appel.token,
				accept : accept,
			},
		});
	}

	sendClosePopupRequest(ID_USER);
	
	if(!accept){
		resetAppelData();
	}
}

function sendAppelInvitationData(id, token, switch_main, data){
	var { wsObject } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(id),
        data: {
            action: "appelInvitationData",
			origin: window.gestionnaire,
			token,
			data,
        },
    });

	if(isMain() && switch_main){
		switchMain(id);
	}

	sendDataUpdateForAll()
}

function sendAppelDataUpdate(id, data){
	var { wsObject, appel } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(id),
        data: {
            action: "appelDataUpdate",
			origin: window.gestionnaire,
			token: appel.token ?? null,
			data,
        },
    });
}

function sendDataUpdateForAll(exclude){
	var appel = appelData.appel;
	var invitees = getInvitees();

	if(!isMain() && appel && appel.main){
		sendAppelDataUpdate(appel.main.id, {
			appel,
		})
	}

	Object.keys(invitees).map((id) => {
		if(!isMe(invitees[id]) && (id != exclude)){
			sendAppelDataUpdate(id, {
				appel: appelData.appel,
			})
		}
	})
}

function sendUserHangupRequest(id, hangup){
	var { wsObject, appel } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(id),
        data: {
            action: "userHangupRequest",
			origin: window.gestionnaire,
			token: appel.token ?? null,
			hangup,
        },
    });
}

function sendUserHangupRequestForAll(hangup){
	var appel = appelData.appel;
	var invitees = getInvitees();

	if(appel && appel.main){
		sendUserHangupRequest(appel.main.id, hangup)
	}

	Object.keys(invitees).map((id) => {
		if(!isMe(invitees[id])){
			sendUserHangupRequest(id, hangup)
		}
	})
}

function sendAppelMainUpdate(id){
	var { wsObject, appel } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(id),
        data: {
            action: "appelMainUpdate",
			origin: window.gestionnaire,
			token: appel.token ?? null,
			data: {
				appel,
			},
        },
    });
}

function sendMainUpdateForAll(new_main){
	toMain(new_main.id);

	Object.keys(getInvitees()).map((id) => {
		sendAppelMainUpdate(id);
	})

	refreshAll();
}

function sendForceHangupFromCall(hangup){
	var { wsObject, appel } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(hangup.id),
        data: {
            action: "forceHangupFromCall",
			origin: window.gestionnaire,
			token: appel.token ?? null,
			hangup,
        },
    });
}

function sendCancelInvitationRequest(id){
	var invitees = getInvitees();

	if(invitees[id]){
		delete invitees[id];
	}

	var { wsObject, appel } = appelData;
    sendJsonMessage({
        wsObject,
        key: idToKey(id),
        data: {
            action: "cancelInvitationRequest",
			main: appel.main,
        },
    });

	sendDataUpdateForAll();
}

function sendClosePopupRequest(id){
	var { wsObject, appel } = appelData;

	if(appel && appel.main){
		sendJsonMessage({
			wsObject,
			key: idToKey(id),
			data: {
				action: "closePopupRequest",
				token: appel.token,
			},
		});
	}
}

function sendClosePopupRequestForAll(){
	var invitees = getInvitees();

	Object.keys(invitees).map((id) => {
		var invited = invitees[id];

		if(invited.invited && (invited.accept === undefined)){
			sendClosePopupRequest(id);
		}
	})
}

function updateDisponibilities(){
    var { wsObject } = appelData;
    sendJsonMessage({
        wsObject,
        key: KEY_SYSTEM,
        data: {
            action: "checkDispoRequest",
        },
    });
}

/** ---------- ---------- ---------- ---------- ---------- ---------- ---------- */

function refreshAll(){
	var components = [
		'NavbarView',
		'ModalsView',
		'ModalAppel',
		'AppelHeaderModal',
	]

	setTimeout(() => {
		components.forEach((code) => {
			if(window.jsx[code]){
				window.jsx[code].refresh();
			}
		})
	}, 100);
}

function getUsers(count){
	var users = [];
	var connected = window.gestionnaire;
	var disponibilities = appelData.disponibilities;

	var gestionnaires = { ...appelData.gestionnaires };

	if(disponibilities && (Object.keys(disponibilities).length > 0)){
		Object.keys(disponibilities).map((id) => {
			if((users.length < count) && disponibilities[id] && (connected.id != id)){
				if(gestionnaires[id]){
					var user = {...gestionnaires[id]};
					user.disponible = true
					users.push(user)
					gestionnaires[id] = null;
				}
			}
		})
	}
	
	if(gestionnaires && (Object.keys(gestionnaires).length > 0)){
		gestionnaires[connected.id] = null;

		Object.keys(gestionnaires).map((id) => {
			if((users.length < count) && gestionnaires[id] && (connected.id != id)){
				users.push(gestionnaires[id])
				gestionnaires[id] = null;
			}
		})
	}

	return users;
}

function getUsersDisponibilities(sorted){
	var users = [];
	var gestionnaires = appelData.gestionnaires;
	var disponibilities = appelData.disponibilities;

	if(gestionnaires && disponibilities){
		if(sorted){
			Object.entries(disponibilities).sort(([,a],[,b]) => {
				if(!a && b){ return -1; }
				if(!a && !b){ return 0; }
				return 1
			}).map(([id]) => {
				if(gestionnaires[id]){
					var user = {...gestionnaires[id]};
					user.disponible = disponibilities[id];
					users.push(user);
				}
			})
		}
		else {
			Object.keys(disponibilities).map((id) => {
				if(gestionnaires[id]){
					var user = {...gestionnaires[id]};
					user.disponible = disponibilities[id];
					users.push(user);
				}
			})
		}
	}
	return users;
}

function getUsersDisponible(){
	var users = [];
	var connected = window.gestionnaire;
	var gestionnaires = appelData.gestionnaires;
	var disponibilities = appelData.disponibilities;

	if(disponibilities && (Object.keys(disponibilities).length > 0)){
		Object.keys(disponibilities).map((id) => {
			if(disponibilities[id] && (connected.id != id)){
				if(gestionnaires && gestionnaires[id]){
					var user = {...gestionnaires[id]};
					user.disponible = true
					users.push(user)
				}
			}
		})
	}

	return users;
}

function verifyGestionnaires(){
	var reload = false;
	var { gestionnaires, disponibilities } = appelData;

	Object.keys(disponibilities).map((key) => {
		if(!gestionnaires || !gestionnaires[key]){
			reload = true;
		}
	})

	if(reload){
		loadGestionnaires();
	}
}

function loadGestionnaires(){
	if(!window.appel_loading_gestionaires){
		window.appel_loading_gestionaires = true;

		$.ajax({
			method: 'POST',
			url: window.url_v2_api_gestionnaire_listing_gestionnaire,
			dataType: 'json',
		})
		.always(function(result) {
			window.appel_loading_gestionaires = false;

			if(result && result.gestionnaires){
				appelData.gestionnaires = result.gestionnaires;
			}
			else {
				appelData.gestionnaires = {};
			}
			refreshAll();
		})
	}
}

function getGestionnaire(id){
	var gestionnaires = appelData.gestionnaires;
	if(gestionnaires && gestionnaires[id]){
		return {...gestionnaires[id]}
	}
	return {};
}


/** ---------- ---------- ---------- ---------- ---------- ---------- ---------- */

export {
	isMe,
	isMain,

	inCall,

	setType,

	switchMain,
	updateJitsi,

	setClient,
	getClient,

	setBemove,
	getBemove,

	addNumero,
	setNumero,
	getNumeros,

	getCalled,
	getInvited,
	getInvitees,
	countInvitees,
	
	getAppelData,
	resetAppelData,

	startAppel,
    startAppelWS,
	initAppelSortant,

	isDisponible,
	setDisponible,

	getUsers,
	refreshAll,
	getGestionnaire,
	getUsersDisponible,
	getUsersDisponibilities,
    updateDisponibilities,

	sendMainUpdateForAll,
	sendDataUpdateForAll,
	sendClosePopupRequestForAll,
	sendUserHangupRequestForAll,

	sendAppelInvitation,
	sendAppelInvitationData,
	sendAppelInvitationResponse,

	sendCancelInvitationRequest,
}
