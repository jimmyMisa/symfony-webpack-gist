function setReady(instance){
	instance.index = instance.index + 1
}
function getReady(instance){
	if(instance.config){
		if(instance.config.element){
			instance.config.element.instance = this;
		}
		var index = instance.index
	}
}
function initReady(onReady){
	return (instance) =>{
		instance.info = {}
		if(instance.config){
			instance.config.instance = instance

			//Handling child parent
			handleChildParent(instance)

			onReady.apply(instance,[instance])
			return {
				index:0
			}
		}
		return {}
	}
}


/*
Handle child using parent JSX
Usage : 
1 - Each child will be automatically register into parent.config.$childs
2 - It is possible to define specific indexation to easilly retrieve the child
3 - Example : <Child config={{ $index: "myCustomChildKey" }}/>

Note : 
	a - never use undexation inside a loop like map, in that cas the indexation will be
	broken and assigned to the last element in the map
	b - See also assets/vue/helper/JsxComponent for more details about manipulating child parent feature
 */
function handleChildParent(instance){

	var config = instance.config;
	var parent = instance.$parent;

	if(parent && parent.config){
		if(!parent.config.$childs){
			parent.config.$childs = []
		}
		if(!parent.config.$childIndexes){
			parent.config.$childIndexes = {}
		}
		parent.config.$childs.push(instance)
		if(config.$index){
			parent.config.$childIndexes[config.$index] = instance
		}
	}
}

export {setReady,getReady,initReady}