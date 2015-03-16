define(['init', 'conf'], function(init, conf) {
	conf.get('camera', function(properties) {
		properties.cameras.forEach(function(camera) {
			var camBox = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshPhongMaterial());
			camBox.position.set(camera.x, camera.y, camera.z);
			camBox.rotation.x += camera.rotX;
			camBox.rotation.y += camera.rotY;
			camBox.rotation.z += camera.rotZ;
			camBox.scale.set(0.01, 0.01, 0.01);
			camBox.overdraw = true;
			camBox.name = camera.name;
			camBox.url = camera.url;
			camBox.action = action;
			camBox.remoteAccess = camera.remoteAccess;
			camBox.remoteAddress = camera.remoteAddress;
			
			var camCone = new THREE.Mesh(new THREE.CylinderGeometry(0, 20, 40, 50, 50, false), new THREE.MeshPhongMaterial());
			camCone.position.set(camera.coneX, camera.coneY, camera.coneZ);
			camCone.rotation.x += camera.rotConeX;
			camCone.rotation.y += camera.rotConeY;
			camCone.rotation.z += camera.rotConeZ;
			camCone.scale.set(0.01, 0.01, 0.01);
			camCone.overdraw = true;

			init.scene.add(camBox);
			init.scene.add(camCone);

			init.objects.push(camBox);
		});
	});
	
	var addControls = function(container, remoteAddress) {
		var controlsContainer = $('<div>', {class: 'bottomCameraDiv'});
		controlsContainer.appendTo(container);
		
		var homeButton = $('<img>', {src: "images/homeButton.png", class: 'cameraButton'});
		homeButton.appendTo(controlsContainer);
		homeButton.on('click touchstart', function(event) {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&gotoserverpresetname=Home");
		});
		
		var leftButton = $('<img>', {src: "images/leftButton.png", class: 'cameraButton'});
		leftButton.appendTo(controlsContainer);
		leftButton.on('click touchstart', function(event) {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rpan=-5");
		});
		
		var rightButton = $('<img>', {src: "images/rightButton.png", class: 'cameraButton'});
		rightButton.appendTo(controlsContainer);
		rightButton.on('click touchstart', function() {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rpan=+5");
		});
		
		var zoomInButton = $('<img>', {src: "images/zoominButton.png", class: 'cameraButton'});
		zoomInButton.appendTo(controlsContainer);
		zoomInButton.on('click touchstart', function() {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rzoom=100");
		});
		
		var zoomOutButton = $('<img>', {src: "images/zoomoutButton.png", class: 'cameraButton'});
		zoomOutButton.appendTo(controlsContainer);
		zoomOutButton.on('click touchstart', function() {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rzoom=-100");
		});
		
		var topButton = $('<img>', {src: "images/topButton.png", class: 'cameraButton'});
		topButton.appendTo(controlsContainer);
		topButton.on('click touchstart', function() {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rtilt=+5");
		});
		
		var bottomButton = $('<img>', {src: "images/bottomButton.png", class: 'cameraButton'});
		bottomButton.appendTo(controlsContainer);
		bottomButton.on('click touchstart', function() {
			$.get(remoteAddress + "/axis-cgi/com/ptz.cgi?camera=1&rtilt=-5");
		});
	};
	
	var action = function(camera) {
		if(!($("#" + camera.name).length)) {
			var container = $('<div>', {id: camera.name, class: 'container draggable animated rubberBand'});
			container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				container.removeClass('animated rubberBand');
			});
			container.appendTo($(document.body));
			init.draggable();
			
			var video = $('<img>', {src: camera.url, class: 'camera'});
			video.appendTo(container);
			var cross = $('<div>', {class: 'cross'});
			cross.html('X');
			cross.on('click touchstart', function() {
				container.remove();
			});
			cross.appendTo(container);

			if(camera.remoteAccess) {
				addControls(container, camera.remoteAddress);
			}
		}
	};
});