class Until {
	static instant(condition, reaction, timeout = 1000, data = {}) {
		if (data.stop) {
			return data;
		}
		if (condition()) {
			reaction();
		} else {
			setTimeout(() => {
				Until.instant(condition, reaction, timeout, data);
			}, timeout);
		}
		return data;
	}
	static delay(condition, reaction, timeout = 1000, data = {}) {
		setTimeout(() => {
			if (data.stop) {
				return data;
			}
			if (condition) {
				reaction();
			} else {
				Until.delay(condition, reaction, timeout, data);
			}
		}, timeout);
		return data;
	}
	static shared(condition, reaction, timeout = 1000, data = {}) {
		setTimeout(() => {
			if (data.stop) {
				return data;
			}
			if (condition()) {
				setTimeout(() => {
					reaction();
				}, timeout / 2);
			} else {
				Until.shared(condition, reaction, timeout, data);
			}
		}, timeout / 2);
		return data;
	}
	static confirm(condition, reaction, timeout = 1000, data = {}) {
		if (data.stop) {
			return data;
		}
		if (condition()) {
			setTimeout(() => {
				if (condition()) {
					reaction();
				} else {
					setTimeout(() => {
						Until.confirm(condition, reaction, timeout, data);
					}, timeout / 2);
				}
			}, timeout / 2);
		} else {
			setTimeout(() => {
				Until.confirm(condition, reaction, timeout, data);
			}, timeout / 2);
		}
		return data;
	}
}

export { Until };
