var prefix = 1

class Random {
	static generate(min, max) {

	}
	static generateToken() {
		prefix = prefix + 1
		var base = (new Date()).getTime()
		var random = Math.floor(Math.random() * 99999) + 10000
		return prefix + '-' + base + '' + random;
	}
}

export {
	Random
}