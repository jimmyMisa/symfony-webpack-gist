function readTree(params = {}) {
	var { data = {}, k, create = false } = params;
	if (typeof k != "string") {
		return undefined;
	}
	var dk = k.split(".");
	var r = data;
	dk.map((key, index) => {
		if (!r) {
			return false;
		}
		var dr = r[key];
		if (create) {
			if (!dr) {
				dr = {}
				r[key] = dr;
			}
		}
		r = dr;
	});
	return r;
}

function createEvent(params = {}) {
	var data = {};

	var events = {
		on(k, action = () => {}) {
			var create = true;
			var r = readTree({ data, k, create });
			if (!r) {
				r = {};
			}
			if (!r.actions) {
				r.actions = [];
			}
			r.actions.push(action);
		},
		_call(k, params) {
			var r = readTree({ data, k });
			if (!r) {
				r = { actions: [] };
			}
			r.actions.map((action = () => {}, index) => {
				if (typeof action != "function") {
					return false;
				}
				action.apply(this, params);
			});
		},
	};
	return events;
}

export { readTree, createEvent };
