function xhrGet(reqUri,callback) {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", reqUri, true);
	xhr.onload = callback;

	xhr.send();
}

function Map(mapName){
	this.sprites = [];
	this.loaded = false;
	var mapJSON;
	function load(){
		xhrGet("images/" + mapName + ".json", function(data){console.log(data)});
		console.log(mapJSON);
	}
	function parseJSON(data){
		// mapJSON = 
		console.log(data);
		console.log(data.responseText);
		console.log(JSON.parse('{"result":true,"count":1}'));
	}

	load();
}