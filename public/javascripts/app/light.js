define(['init', 'conf', 'shader'], function(init, conf, shader) {
	var colorTab = [
		[0, "FF0000"],
		[6375, "FF9000"],
		[12750, "FFFF00"],
		[19125, "9ACD32"],
		[25500, "00FF00"],
		[30855, "008000"],
		[36210, "00FFFF"],
		[41565, "6495ED"],
		[46920, "0000FF"],
		[51573, "800080"],
		[56227, "FFC0CB"],
		[36855, "F72757"],
		[60881, "EE82EE"]
	];

	conf.get('light', function(data) {
		data.lights.forEach(function(light) {
			var sphereGeom = new THREE.SphereGeometry(20, 20, 0);
			var temp = new THREE.Mesh(sphereGeom, new THREE.MeshPhongMaterial());
			temp.position.set(light.x, light.y, light.z);
			temp.scale.set(0.01, 0.01, 0.01);
			temp.overdraw = true;
			temp.name = light.name;
			temp.lightUrl = light.url;
			getState(temp);
			temp.action = action;
			temp.halo = shader.createHalo(sphereGeom, temp.position, 0.017, 0xffffff);
			init.scene.add(temp);
			init.objects.push(temp);
		});
	});

	var action = function(light) {
		if (!$('#' + light.name).length) {
			var container = $('<div>', {
				id: light.name,
				class: 'container lamp draggable animated rubberBand'
			});
			container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				container.removeClass('animated rubberBand');
			});
			container.appendTo($(document.body));
			init.draggable();
			var cross = $('<div>', {
				class: 'cross cross2'
			});
			cross.html('X');
			cross.on('click touchstart', function() {
				container.remove();
			});
			cross.appendTo(container);
			var switcher = $('<div>', {
				class: 'switcher'
			});
			switcher.on('click touchstart', function() {
				switchOnOff(light, put, getState);
			});
			switcher.appendTo(container);
			var sliderContainer = $('<div>', {
				id: 'sliderContainer'
			});
			sliderContainer.appendTo(container);
			var slider = $('<div>', {
				id: 'slider' + light.name,
				class: 'slider'
			});
			slider.appendTo(sliderContainer);
			$(function() {
				$("#slider" + light.name).slider({
					orientation: "horizontal",
					min: 0,
					max: 200,
					step: 25,
					slide: function(event, ui) {
						changeLightBright(light, ui.value);
					}
				});
				getBrightness(light.lightUrl, $('#slider' + light.name));
			});
			var palette = $('<div>', {
				class: 'palette'
			});
			palette.appendTo(container);
			paletteCreator(light, palette);
		}
	};

	var paletteCreator = function(light, palette) {
		for (var i = 0; i < 12; i++) {
			var temp = $('<div>', {
				id: i,
				class: 'color',
				style: "background-color: #" + colorTab[i][1]
			});
			addEvent(temp, light, colorTab[i]);
			temp.appendTo(palette);
		}

	};

	var addEvent = function(temp, light, color) {
		temp.on('click touchstart', function() {
			changeLightColor(light, color);
		});
	};

	var isLightOn = function(url, callback) {
		var http = new XMLHttpRequest();
		http.open('GET', url, true);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (http.status == 200) {
					if (JSON.parse(http.response).state.on) {
						callback();
					}
				}
			}
		};
		http.send('');
	};

	var put = function(light, property, value, callback) {
		var http = new XMLHttpRequest();
		http.open('PUT', light.lightUrl + '/state', true);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (http.status == 200) {
					if (callback !== undefined) {
						callback(light);
					}
				}
			}
		};
		http.send('{"' + property + '":' + value + '}');
	};

	var switchOnOff = function(light, callback) {
		var http = new XMLHttpRequest();
		http.open('GET', light.lightUrl, true);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (http.status == 200) {
					if (JSON.parse(http.response).state.on) {
						callback(light, 'on', false);
						light.material.color.setHex(parseInt("6C7A89", 16));
					} else {
						callback(light, 'on', true, getState);
					}
				}
			}
		};
		http.send('');
	};

	var getState = function(light) {
		var http = new XMLHttpRequest();
		http.open('GET', light.lightUrl, true);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (http.status == 200) {
					if (!JSON.parse(http.response).state.on) {
						light.material.color.setHex(parseInt("6C7A89", 16));
						light.halo.material.uniforms.glowColor.value = new THREE.Color('#6C7A89');
					} else {
						light.material.color.setHex(parseInt(hueToHex(JSON.parse(http.response).state.hue), 16));
						light.halo.material.uniforms.glowColor.value = new THREE.Color('#' + hueToHex(JSON.parse(http.response).state.hue));
					}
				}
			}
		};
		http.send('');
	};

	var getBrightness = function(url, slider) {
		var http = new XMLHttpRequest();
		http.open('GET', url, true);
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				if (http.status == 200) {
					slider.slider("option", "value", JSON.parse(http.response).state.bri);
				}
			}
		};
		http.send('');
	};

	var changeLightColor = function(light, color) {
		isLightOn(light.lightUrl, function() {
			put(light, 'hue', color[0]);
			light.material.color.setHex(parseInt(color[1], 16));
			light.halo.material.uniforms.glowColor.value = new THREE.Color('#' + hueToHex(color[0]));
		});
	};

	var changeLightBright = function(light, bright) {
		isLightOn(light.lightUrl, function() {
			put(light, 'bri', bright);
		});
	};

	function hueToHex(hueValue) {
		for (var i = 0; i < colorTab.length; i++) {
			if (colorTab[i][0] == hueValue) {
				return colorTab[i][1];
			}
		}
	}
});