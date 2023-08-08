var {TemplateElement} = require('plugins/tools/TemplateManager');

window.heplerTemplate = {
	generateFrom:(code) =>{
		var t = new TemplateElement(code)
		return t.get()
	}
}
window.createTextNode = (text) =>{
	return document.createTextNode(text)
}