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
			camBox.action = 'displayVideo';

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
	
	$(document).on('displayVideo', function(camera) {
		var container = $('<div>', {id: camera.name, class: 'container'});
		container.appendTo($(document.body));
		var video = $('<img>', {src: camera.url, class: 'camera'});
		video.appendTo(container);
		var cross = $('<img>', {src: 'images/logo-cross.png', class: 'cross'});
		cross.appendTo(container);
	});
});