define(['init'], function(init) {
	$(document).mousedown(function(event) {
		event.preventDefault();
		var mouse = new THREE.Vector2();
		var raycaster = new THREE.Raycaster();
		mouse.x = ( event.clientX / init.renderer.domElement.width ) * 2 - 1;
		mouse.y = -( event.clientY / init.renderer.domElement.height ) * 2 + 1;
		raycaster.setFromCamera(mouse, init.camera);
		var intersects = raycaster.intersectObjects(init.objects);
    if (intersects.length > 0) {
			var object = intersects[0].object;
			object.action(object);
		}
	});
});