var prefix = 1;

class Random {
	static generate(min, max) {}
	static generateToken() {
		prefix = prefix + 1;
		var base = new Date().getTime();
		var random = Math.floor(Math.random() * 99999) + 10000;
		return prefix + "-" + base + "" + random;
	}
}

class IndexationInstance {
	timings = [];
	timingIndexes = [];
	getIndex(element) {
		var params = {
			timings: this.timings,
			timingIndexes: this.timingIndexes,
			element,
		};
		return Indexation._getIndex(params);
	}
	getData(element) {
		var params = {
			timings: this.timings,
			timingIndexes: this.timingIndexes,
			element,
		};
		return Indexation._getData(params);
	}
	subscribe(element) {
		var params = {
			timings: this.timings,
			timingIndexes: this.timingIndexes,
			element,
		};
		return Indexation._subscribe(params);
	}
}
class Indexation {
	static timings = [];
	static timingIndexes = [];
	static getIndex(element) {
		var params = {
			timings: Indexation.timings,
			timingIndexes: Indexation.timingIndexes,
			element,
		};
		return Indexation._getIndex(params);
	}
	static _getIndex(params = {}) {
		var { timingIndexes, element } = params;
		return timingIndexes.indexOf(element);
	}
	static getData(element) {
		var params = {
			timings: Indexation.timings,
			timingIndexes: Indexation.timingIndexes,
			element,
		};
		return Indexation._getData(params);
	}
	static _getData(params = {}) {
		var { timings } = params;
		var index = Indexation._getIndex(params);
		if (index == -1) {
			index = Indexation._subscribe(params);
		}
		var { data = {} } = timings[index];
		return data;
	}
	static subscribe(element) {
		var params = {
			timings: Indexation.timings,
			timingIndexes: Indexation.timingIndexes,
			element,
		};
		return Indexation._subscribe(params);
	}
	static _subscribe(params = {}) {
		var { timingIndexes, timings, element } = params;
		timingIndexes.push(element);
		var data = { index: 0, id: Random.generateToken() };
		timings.push({
			element,
			data,
		});
		return Indexation._getIndex(params);
	}
	static create() {
		var indexation = new IndexationInstance();
		return indexation;
	}
}

function waitCalm(element, f = () => {}, t = 1000) {
	var data = Indexation.getData(element);
	data.index = data.index + 1;
	var index = data.index;
	setTimeout(() => {
		if (data.index == index) {
			f(element);
		}
	}, t);
}

export { waitCalm };
