define(['init'], function(init) {
	
	var vertexShader = 
		'uniform vec3 viewVector;' +
		'uniform float c;' +
		'uniform float p;' +
		'varying float intensity;' +
		'void main()' +
		'{' +
			'vec3 vNormal = normalize( normalMatrix * normal );' +
			'vec3 vNormel = normalize( normalMatrix * viewVector );' +
			'intensity = pow( c - dot(vNormal, vNormel), p );' +
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );' +
		'}';
	
	var fragmentShader = 
		'uniform vec3 glowColor;' +
		'varying float intensity;' +
		'void main()' +
		'{' +
			'vec3 glow = glowColor * intensity;' +
			'gl_FragColor = vec4( glow, 1.0 );' +
		'}';
	
	// Cookies
	var shaderMaterial = new THREE.ShaderMaterial( 
	{
	  uniforms: 
		{ 
			"c":   { type: "f", value: 0.2 },
			"p":   { type: "f", value: 6.0 },
			glowColor: { type: "c", value: new THREE.Color(0xffffff) },
			viewVector: { type: "v3", value: init.camera.position }
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	
	// Lamps
	var shaderMaterial2 = new THREE.ShaderMaterial({
		uniforms: {
			"c": {
				type: "f",
				value: 1.0
			},
			"p": {
				type: "f",
				value: 1.4
		},
			glowColor: {
				type: "c",
				value: new THREE.Color(0xffffff)
			},
			viewVector: {
				type: "v3",
				value: init.camera.position
			}
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.FrontSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	
	// Cookies
	function createGlow(geometry, position, scale, color, isAnimated) {
		var glow = new THREE.Mesh(geometry.clone(), shaderMaterial.clone());
		glow.position.set(position.x, position.y, position.z);
		glow.scale.set(scale, scale, scale);
		glow.material.uniforms.glowColor.value = new THREE.Color(color);
		if(isAnimated) {
			glow.up = true;
			addAnimation(glow);
		}
		init.scene.add(glow);
		init.shaders.push(glow);
	}
	
	// Lamps
	function createHalo(geometry, position, scale, color) {
		var halo = new THREE.Mesh(geometry.clone(), shaderMaterial2.clone());
		halo.position.set(position.x, position.y, position.z);
		halo.scale.set(scale, scale, scale);
		halo.material.uniforms.glowColor.value = new THREE.Color(color);
		init.scene.add(halo);
		init.shaders.push(halo);
		return halo;
	}
	
	function addAnimation(shader) {
		setInterval(function() {
			if(shader.material.uniforms.c.value == 0.2) {
				shader.up = true;
			} 
			if(shader.material.uniforms.c.value >= 0.4) {
				shader.up = false;
			} 
			if(shader.up) {
				shader.material.uniforms.c.value += 0.025;
			} else {
				shader.material.uniforms.c.value -= 0.025;
			}
		}, 100);
	}
	
	return {
		createGlow: function(geometry, position, scale, color, isAnimated) {
			createGlow(geometry, position, scale, color, isAnimated);
		},
		createHalo: function(geometry, position, scale, color) {
			return createHalo(geometry, position, scale, color);
		}
	};
});