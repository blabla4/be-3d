define(['init'], function(init) {
	var tvUrl = "http://10.134.15.110/sony/system";
	var tvOn;
	var tvCommand;
	
	var tvMaterial = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0});
	var tvBox = new THREE.Mesh(new THREE.BoxGeometry(125, 120, 20), tvMaterial);
	tvBox.position.set(-11.53, 15.5, -8.65);
	tvBox.name = "tv";
	tvBox.scale.set(0.01, 0.01, 0.01);
	tvBox.overdraw = true;
	tvBox.action = clickOnTV;
	
	var tvMaterial2 = new THREE.MeshLambertMaterial();
	var tvDisplayBox = new THREE.Mesh(new THREE.BoxGeometry(120, 61, 1), tvMaterial2);
	tvDisplayBox.position.set(-11.53, 15.77, -8.65);
	tvDisplayBox.name = "tv";
	tvDisplayBox.scale.set(0.01, 0.01, 0.01);
	tvDisplayBox.overdraw = true;
	tvDisplayBox.action = clickOnTV;
	
	init.objects.push(tvBox);
	init.scene.add(tvBox);
	init.objects.push(tvDisplayBox);
	init.scene.add(tvDisplayBox);

	initTV();
	
	function initTV() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var jstring = JSON.parse(xmlhttp.responseText);
				if (jstring.result[0].status == "active") {
					tvDisplayBox.material.color.setHex("0xffffff");
				} else {
					tvDisplayBox.material.color.setHex("0x000000");
				}
			}
		};
		xmlhttp.open('POST', tvUrl, true);
		xmlhttp.setRequestHeader("X-Auth-PSK", "iamisen");
		tvCommand = '{"id":3,"method":"getPowerStatus","version":"1.0","params":["1.0"]}';
		xmlhttp.send(tvCommand);
	}
	
	function clickOnTV(obj) {
		if (tvOn) {
			tvCommand = '{"id":3,"method":"setPowerStatus","version":"1.0","params":[{"status":false}]}';
			tvOn = false;
			tvDisplayBox.material.color.setHex("0x000000");
		} else {
			tvCommand = '{"id":3,"method":"setPowerStatus","version":"1.0","params":[{"status":true}]}';
			tvOn = true;
			tvDisplayBox.material.color.setHex("0xffffff");
		}
		commandTV();
	}

	function commandTV(command) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('POST', tvUrl, true);
		xmlhttp.setRequestHeader("X-Auth-PSK", "iamisen");
		xmlhttp.send(tvCommand);
	}
});