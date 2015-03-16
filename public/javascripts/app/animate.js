define(['init'], function(init) {
	
	var controls = new THREE.OrbitControls(init.camera, init.renderer.domElement);
	controls.minDistance = 15;
	controls.maxDistance = 50;
	controls.minPolarAngle = 0;
	controls.maxPolarAngle = Math.PI / 3;
	controls.zoomSpeed = 0.5;
	
	function animate() {
		requestAnimationFrame(animate);
		if(init.locked) {
			init.camera.position.set(0, 45, 1);
			init.camera.lookAt(init.scene.position);
		}
		init.renderer.render(init.scene, init.camera);
		controls.update();
		
		init.shaders.forEach(function(shader) {
			shader.material.uniforms.viewVector.value = 
				new THREE.Vector3().subVectors(init.camera.position, shader.position);
		});
	}
	
	return {
		start: function() {
			animate();
		}
	};
});