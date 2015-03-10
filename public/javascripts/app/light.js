define(['init', 'conf'], function(init, conf) {
	var material = new THREE.MeshPhongMaterial({color: 0xffff00});
		
	conf.get('light', function(data) {
		data.lights.forEach(function(light) {
			var temp = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 0), material);
			temp.position.set(light.x, light.y, light.z);
			temp.scale.set(0.01, 0.01, 0.01);
			temp.overdraw = true;
			temp.name = light.name;
			
			init.scene.add(temp);
		});
	});
});