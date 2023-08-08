import Vue from "vue";
import { getReady, setReady, initReady } from "vue/helper/ready";
import { idGenerator } from "core/tools/security/idGenerator.js";

/*
/!\ Important note
1 - Calling component without using JsxConfig.create is now de precated
for new components (old components are yet allowed bug using new features will not be available)

 */

function JsxComponent({ render, components, methods, onReady }) {
	if (!methods) {
		methods = {};
	}
	if (!onReady) {
		onReady = () => {};
	}
	return {
		components,
		props: ["config"],
		data: initReady(onReady),
		methods: {
			...{
				$onRender(f) {
					var run = () => {
						var el = this.$el;
						var data = getData(el);
						f(this);
						if (!data.ready) {
							data.ready = true;
						}
					};
					setTimeout(run, 100);
				},
				$baseInitiate() {
					if (this.$renderMethod) {
						this.$onRender(this.$renderMethod);
					}
				},
				/*
				Use instance.$deepRefresh to refresh also all sub-child components deeply
				Note : 
					a- this method is greedy because it will refresh all sub child
					so the purpose is never use this inside a component that have unkown
					or a big amount of sub-child (sub-sub-childs included)
				 */
				$deepRefresh() {
					this.refresh();
					var { $childs = [] } = this.config;
					if ($childs && $childs.map) {
						$childs.map((child) => {
							child.$deepRefresh();
						});
					}
				},
				/*
				Feature : Manipulating child parent
				Use $getChild(key) to get the indexed child from the current component
				Usage : 
					1 - <Child config={{ $index: "myCustomChildKey" }}/>
					1 - this.$getChild("myCustomChildKey") -> childInstance : Instance
				Note : 
					a - Trust only this method if not calling the child inside a loop / map
					b - Loop and map could be patched using
						i - <Child config={{ $index: `myCustomChildKey${index}` }}/>
						ii - this.$getChild(`myCustomChildKey${index}`) -> childInstance : Instance
					c - This function will return undefined if the config key is not defined
						for the parent component (define it using JsxConfig.create)
				 */
				$getChild(key) {
					var { $childIndexes = {} } = this.config;
					var { [key]: child } = $childIndexes;
					return child;
				},
				getContent() {
					return this.$options._renderChildren;
				},
				update() {
					this.$forceUpdate();
				},
				refresh() {
					if (this.config) {
						this.config.refreshState = 2;
						this.update();
						this.config.refreshState = 1;
						this.update();
					}
				},
				parentConfig(k) {
					if (
						this.config.parent &&
						this.config.parent &&
						this.config.parent.config
					) {
						return this.config.parent.config[k];
					}
					return null;
				},
				currentConfig(k) {
					if (this.config) {
						return this.config[k];
					}
					return null;
				},
				registerChild() {
					if (this.config && this.config.parent) {
						this.config.parent.child = this;
					}
				},
				getConfig(k, v) {
					if (this.config) {
						return this.config[k];
					}
				},
				setConfig(k, v) {
					if (this.config && this.config[k]) {
						this.config[k] = v;
					}
				},
				getData(k, v) {
					if (this.config && this.config.data) {
						return this.config.data[k];
					}
				},
				setData(k, v) {
					if (
						this.config &&
						this.config.data &&
						this.config.data[k]
					) {
						this.config.data[k] = v;
					}
				},
				setValue(key, value) {
					this.config[key] = value;
					this.update();
				},
				...methods,
			},
		},
		render(h) {
			getReady(this);
			this.registerChild();
			this.$baseInitiate();
			return render.apply(this, [h, this, this.config]);
		},
	};
}

/*
JsxConfig provide a new way to create a JsxComponent configuration
Usage : 
	1 - create({data, key, then, nonIndexed}) -> config : Object
		i - data is the config : eg : {}
		ii - key is the key indexation to retrieve the saved configuration
			If not defined, the system will define on arbitraty
		iii - then will provide the key (necessary in case of it was defined arbitrary)
		iv - nonIndexed will tell that the configuration is non indexed
			so it will be reseted by any refresh or parent update
Notes :
	a - prefer use nonIndexed instead of direct object configuration (Deprecated)

 */

class JsxConfig {
	//Provide time is in ms, necessary for key arbirary reception

	static provideTime = 10;

	static config = {};

	static create(params = {}) {
		var { data = {}, key, then = () => {}, nonIndexed = false } = params;
		if (nonIndexed) {
			return data;
		}
		if (!key) {
			key = idGenerator();
		}
		if (!JsxConfig.config[key]) {
			JsxConfig.config[key] = data;
		}
		setTimeout(() => {
			then(key);
		}, 10);
		return JsxConfig.config[key];
	}
}
export { JsxComponent, JsxConfig };
