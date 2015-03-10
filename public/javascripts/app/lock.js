define(['init'], function(init) {
	var _cameraPos = init.camera.position;
	$("#lock").click(function() {
		if(init.locked) {
			this.src = "images/cadena2.png";
			init.camera.position = _cameraPos;
			init.locked = false;
		} else {
			this.src = "images/cadena.png";
			_cameraPos = init.camera.position;
			init.locked = true;
		}
	});
});