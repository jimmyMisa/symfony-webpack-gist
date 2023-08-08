import Vue from 'vue';
import { Random } from "plugins/random/Random";


function renderVue(Component,query,config){
	var element = {}
	if(!config){
		config = {}
	}
	config.element = element
	var vueElement = new Vue({
		el:query,
		render:(createElement) =>{
			return createElement(Component,{
				props:{
					config:config
				}
			})
		}
	});
	return config
}
function getViewHTML(Component,config){
	var element = {}
	if(!config){
		config = {}
	}
	var id = "pseudo_" + Random.generateToken();
	var query = "#"+id
	var pseudo = $('<div>')
	$(document.body).append(pseudo)
	$(pseudo).attr('id',id)
	config.element = element
	var vueElement = renderVue(Component,query,config);
	var parent = $('<div>')
	$(parent).append(vueElement.instance.$el)
	var html = $(parent).html()
	$(parent).remove()
	return html
}
function getView(Component,config){
	var element = {}
	if(!config){
		config = {}
	}
	var id = "pseudo_" + Random.generateToken();
	var query = "#"+id
	var pseudo = $('<div>')
	$(document.body).append(pseudo)
	$(pseudo).attr('id',id)
	config.element = element
	var vueElement = renderVue(Component,query,config);
	return vueElement.instance.$el;
}
function setChildView(parent,Component,config){
	var element = {}
	if(!config){
		config = {}
	}
	var id = "pseudo_" + Random.generateToken();
	var query = "#"+id
	var pseudo = $('<div>')
	$(document.body).append(pseudo)
	$(pseudo).attr('id',id)
	config.element = element
	var vueElement = renderVue(Component,query,config);
	var elt = $(vueElement.instance.$el);
	$(parent).html('')
	$(parent).append(elt)
	return elt;
}

export {renderVue,getViewHTML,getView,setChildView}