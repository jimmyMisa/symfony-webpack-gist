import { Random } from "plugins/random/Random.js";

var timings = [];
var timingIndexes = [];

function getIndex(input) {
	return timingIndexes.indexOf(input);
}

function getData(input) {
	var index = getIndex(input);
	if (index == -1) {
		index = subscribe(input);
	}
	var { data = {} } = timings[index];
	return data;
}

function subscribe(input) {
	timingIndexes.push(input);
	var data = { index: 0, id: Random.generateToken() };
	timings.push({
		input,
		data,
	});
	return getIndex(input);
}

export { getIndex, getData, subscribe };
