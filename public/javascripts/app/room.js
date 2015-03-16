define(['init'], function(init) {

	function load(daeFile) {
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		init.renderer.setSize(WIDTH, HEIGHT);

		document.body.appendChild(init.renderer.domElement);

		init.camera.position.set(0, 45, 1);
		init.scene.add(init.camera);

		$(window).resize(function() {
			init.renderer.setSize(window.innerWidth, window.innerHeight);
			init.camera.aspect = window.innerWidth / window.innerHeight;
			init.camera.updateProjectionMatrix();
		});
		
		addLights();

		init.loader.options.convertUpAxis = true;
		init.loader.load(daeFile, function ( collada ) {
			var dae = collada.scene;
			var skin = collada.skins[ 0 ];
			dae.position.set(43,15,35);
			dae.scale.set(10,10,10);
			init.scene.add(dae);
		});
	}
	
	function addLights() {
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
		}
	};
});