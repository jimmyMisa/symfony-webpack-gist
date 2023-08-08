import Vue from "vue";
import { getIndex, getData, subscribe } from "tools/indexation/indexation.js";
import { JsxComponent, JsxConfig } from "vue/helper/JsxComponent";
import { idGenerator } from "core/tools/security/idGenerator.js";
import { readTree } from "core/tree/tree.js";
import { waitCalm } from "core/stable/stable.js";

var V01Component = {
	getData(object, key) {
		var $data = {};
		if (object && typeof object == "object") {
			$data = object.$data;
		}
		if (key === undefined) {
			return $data;
		}
		return $data[key];
	},
	setData(object, params = {}) {
		var $data = {};
		if (object && typeof object == "object") {
			$data = object.$data;
		}
		Object.keys(params).map((key) => {
			var value = params[key];
			$data[key] = value;
		});
	},
	/*
	Plugins management
	 */
	plugins: {},
	addPlugin(params = {}) {
		Object.keys(params).map((key) => {
			var value = params[key];
			V01Component.plugins[key] = value;
		});
	},
	removePlugin(params = {}) {
		var { names = [] } = params;
		names.map((name) => {
			delete V01Component.plugins[name];
		});
	},
	getPlugin(params = {}) {
		var { name } = params;
		if (name) {
			return V01Component.plugins[name];
		}
		return V01Component.plugins;
	},
	getPluginMethod(params = {}) {
		var { name, method } = params;
		var { [name]: plugin = {} } = V01Component.getPlugin();
		var { [method]: methodFunction = () => {} } = plugin;
		return methodFunction;
	},
	data: {
		getIndex,
		getData,
		subscribe,
	},
	tree(data, k) {
		return readTree({
			data,
			k,
		});
	},
	path(k) {
		var data = V01Component;
		return V01Component.tree(data, k);
	},
	upgrades: {},
	saveInstance(params = {}) {
		var { instance, id, name } = params;
		instances[id] = {
			instance,
			id,
			name,
		};
	},
	/*
	Use V01Component.make to setup without specifying render, just define any params as methods
	 */
	make(methods = {}, additionnal = {}) {
		var params = { ...additionnal, methods };
		return V01Component.setup(params);
	},
	/*
	Use V01Component.setup to create a JsxComponent with support of config.$data
	 */
	setup({ render, components, methods = {}, onReady } = {}) {
		methods = {
			...{
				refresh() {
					if (this.config) {
						waitCalm(this.config, () =>{
							this.config.refreshState = 2;
							this.update();
							this.config.refreshState = 1;
							this.update();
						}, 50)
					}
				},
				refreshDirect() {
					if (this.config) {
						this.config.refreshState = 2;
						this.update();
						this.config.refreshState = 1;
						this.update();
					}
				},
				$cp() {
					return V01Component;
				},
				/*
				Used to get a config.$data[key] or config.$data if key is undefined
				 */
				$getData(key) {
					var { config = {} } = this;
					var { $data = {} } = config;
					return V01Component.getData(config, key);
				},
				/*
				Used to set dynamically config.$data for each key in params
				 */
				$setData(params = {}, object) {
					var { config = {} } = this;
					var { $data = {} } = config;
					V01Component.setData(config, params);
					config.$data = $data;
				},
			},
			...methods,
		};
		if (methods.$render) {
			render = methods.$render;
		}
		return JsxComponent({ render, components, methods, onReady });
	},

	/*
	Use V01Component.createConfig as shortcut of JsxConfig.create
	 */
	createConfig: JsxConfig.create,

	/*
	Use V01Component.asConfig when require object data
	to be managed by the childs as a persistent change
	Eg : suppose having object with subojects like
	var o = {
		forms:[
			{type:"radio"},
			{type:"input"}
		]
	}
	by calling p = V01Component.asConfig(o)
	it will return 
	{
		$data:{
			forms:[
				{
					$data:{type:"radio"}
				},
				{
					$data:{type:"input"}
				}
			]
		}
	}
	Thanks to this the child component will automatically provide the config.$data object
	This will protect from problems on updating data from child object
	that will not have effect when the parent will be refreshed as non persistent value
	 */
	asConfig(config = {}) {
		if (Array.isArray(config)) {
			return config.map(V01Component.asConfig);
		} else if (config && typeof config == "object") {
			var $data = {};
			Object.keys(config).map((key) => {
				var value = config[key];
				if (key.indexOf("$") == 0) {
					$data[key] = value;
				} else {
					$data[key] = V01Component.asConfig(value);
				}
			});
			return V01Component.asConfigSuperficial($data);
		}

		return config;
	},
	asConfigSuperficial(config = {}, references) {
		var $data = config;
		return { $data };
	},
	asObject(config = {}, references) {
		if (!references || typeof references != "object") {
			references = {};
		}
		if (!references.data) {
			references.data = [];
		}
		if (config) {
			if (
				typeof config == "object" &&
				!Array.isArray(config) &&
				references.data.indexOf(config) != -1
			) {
				return {};
			}
		}
		references.data.push(config);
		if (Array.isArray(config)) {
			return config.map((dconfig) => {
				return V01Component.asObject(dconfig, references);
			});
		} else if (config && typeof config == "object") {
			if (config.$data) {
				return V01Component.asObject(config.$data, references);
			} else {
				var data = {};
				Object.keys(config).map((key) => {
					var value = config[key];
					if (key.indexOf("$") != -1) {
						data[key] = value;
					} else {
						var pvalue = value;
						value = V01Component.asObject(value, references);
						data[key] = value;
					}
				});
				return data;
			}
		}
		return config;
	},
};

var C = V01Component;
export { V01Component , C};
