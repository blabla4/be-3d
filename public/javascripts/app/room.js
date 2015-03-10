define(['init'], function(init) {
	var controls;
	
	function load(daeFile) {
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		init.renderer.setSize(WIDTH, HEIGHT);

		document.body.appendChild(init.renderer.domElement);

		init.camera.position.set(0, 45, 1);
		init.scene.add(init.camera);

		putLights();

		init.loader.options.convertUpAxis = true;
		init.loader.load(daeFile, function ( collada ) {
			var dae = collada.scene;
			var skin = collada.skins[ 0 ];
			dae.position.set(43,15,35);
			dae.scale.set(10,10,10);
			init.scene.add(dae);
		});
		
		controls = new THREE.OrbitControls(init.camera, init.renderer.domElement);
		controls.minDistance = 15;
		controls.maxDistance = 50;
		controls.minPolarAngle = 0;
		controls.maxPolarAngle = Math.PI / 3;
		controls.zoomSpeed = 0.5;
	}

	function animate() {
		requestAnimationFrame(animate);
		if(init.locked) {
			init.camera.position.set(0, 45, 1);
			init.camera.lookAt(init.scene.position);
		}
		init.renderer.render(init.scene, init.camera);
		controls.update();
	}

	function putLights() {
		var light = new THREE.PointLight(0xfffff3, 0.8);
		light.position.set(-100, 200, 100);
		init.scene.add(light);

		var sphereSize = 1;
		var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
		init.scene.add(pointLightHelper);

		var light2 = new THREE.PointLight(0xd7f0ff, 0.2);
		light2.position.set(200, 200, 100);
		init.scene.add(light2);

		var pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
		init.scene.add(pointLightHelper2);

		var light3 = new THREE.PointLight(0xFFFFFF, 0.5);
		light3.position.set(150, 200, -100);
		init.scene.add(light3);

		var pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize);
		init.scene.add(pointLightHelper3);
	}
	
	return {
		show: function(daeFile) {
			load(daeFile);
			animate();
		}
	};
});