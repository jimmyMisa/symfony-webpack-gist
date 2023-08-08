import Test from 'vue/components/Test/Test'
import { C } from "vue/helper/V01Component";
var {setChildView} = require('vue/helper/renderVue.js');

var config = null;

function getConfig() {
	if(!config){
		config = {}
	}
	return config;
}

function main() {
	setChildView("#app",Test,getConfig())
}

export { main, getConfig };
