import Vue from "vue";
import { getIndex, getData, subscribe } from "tools/indexation/indexation.js";
import { JsxComponent, JsxConfig } from "vue/helper/JsxComponent";
import { idGenerator } from "core/tools/security/idGenerator.js";
import { readTree } from "core/tree/tree.js";

var V02Component = {
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
			V02Component.plugins[key] = value;
		});
	},
	removePlugin(params = {}) {
		var { names = [] } = params;
		names.map((name) => {
			delete V02Component.plugins[name];
		});
	},
	getPlugin(params = {}) {
		var { name } = params;
		if (name) {
			return V02Component.plugins[name];
		}
		return V02Component.plugins;
	},
	getPluginMethod(params = {}) {
		var { name, method } = params;
		var { [name]: plugin = {} } = V02Component.getPlugin();
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
		var data = V02Component;
		return V02Component.tree(data, k);
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
	Use V02Component.make to setup without specifying render, just define any params as methods
	 */
	make(methods = {}, additionnal = {}) {
		var params = { ...additionnal, methods };
		return V02Component.setup(params);
	},
	/*
	Use V02Component.setup to create a JsxComponent with support of config.$data
	 */
	setup({ render, components, methods = {}, onReady } = {}) {
		//Experimetal
		/*var cnf = null*/
		methods = {
			...{
				getData(){
					return getData(this)
				},
				$cp() {
					return V02Component;
				},
				/*
				Used to get a config.$data[key] or config.$data if key is undefined
				 */
				$getData(key) {
					var { config = {} } = this;
					var { $data = {} } = config;
					return V02Component.getData(config, key);
				},
				/*
				Used to set dynamically config.$data for each key in params
				 */
				$setData(params = {}, object) {
					var { config = {} } = this;
					var { $data = {} } = config;
					V02Component.setData(config, params);
					config.$data = $data;
				},
				onReadyTiming(){
					return 100;
				},
				onReady(){
					var {ready} = this.getData();
					var { init = () => {} } = this;
					if(!ready){
						this.getData().ready = true;
						setTimeout(() =>{
							init();
						}, this.onReadyTiming())
					}
				},
				//Experimetal
				/*$saveConfig() {
					cnf = this.config
				},
				$getConfig(){
					return cnf;
				},*/
			},
			...methods,
		};
		if (methods.$render) {
			render = methods.$render;
		}
		return JsxComponent({ render, components, methods, onReady });
	},

	/*
	Use V02Component.createConfig as shortcut of JsxConfig.create
	 */
	createConfig: JsxConfig.create,

	/*
	Use V02Component.asConfig when require object data
	to be managed by the childs as a persistent change
	Eg : suppose having object with subojects like
	var o = {
		forms:[
			{type:"radio"},
			{type:"input"}
		]
	}
	by calling p = V02Component.asConfig(o)
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
			return config.map(V02Component.asConfig);
		} else if (config && typeof config == "object") {
			var $data = {};
			Object.keys(config).map((key) => {
				var value = config[key];
				if (key.indexOf("$") == 0) {
					$data[key] = value;
				} else {
					$data[key] = V02Component.asConfig(value);
				}
			});
			return V02Component.asConfigSuperficial($data);
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
				return V02Component.asObject(dconfig, references);
			});
		} else if (config && typeof config == "object") {
			if (config.$data) {
				return V02Component.asObject(config.$data, references);
			} else {
				var data = {};
				Object.keys(config).map((key) => {
					var value = config[key];
					if (key.indexOf("$") != -1) {
						data[key] = value;
					} else {
						var pvalue = value;
						value = V02Component.asObject(value, references);
						data[key] = value;
					}
				});
				return data;
			}
		}
		return config;
	},
};

var C = V02Component;
export { V02Component , C};