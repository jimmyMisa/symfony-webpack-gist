var moment = require("moment");

function getCurrentTimestamp() {
	var timestamp = moment().unix();
	return timestamp;
}

export { getCurrentTimestamp };
