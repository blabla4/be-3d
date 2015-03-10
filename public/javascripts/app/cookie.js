define(['init', 'conf'], function(init, conf) {
	var material = new THREE.MeshPhongMaterial({color: 0xffff00});
		
	conf.get('cookie', function(data) {
		data.cookies.forEach(function(cookie) {
			var temp = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 0), material);
			temp.position.set(cookie.x, cookie.y, cookie.z);
			temp.scale.set(0.01, 0.01, 0.01);
			temp.overdraw = true;
			temp.name = cookie.name;

			init.scene.add(temp);
			init.objects.push(temp);
		});
	});
});