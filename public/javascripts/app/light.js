define(['init', 'conf'], function(init, conf) {
	var material = new THREE.MeshPhongMaterial({color: 0xffff00});
	
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
		[60881, "EE82EE"]
	];
	
	conf.get('light', function(data) {
		data.lights.forEach(function(light) {
			var temp = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 0), material);
			temp.position.set(light.x, light.y, light.z);
			temp.scale.set(0.01, 0.01, 0.01);
			temp.overdraw = true;
			temp.name = light.name;
			temp.action = action;
			temp.lightUrl = light.url;
			init.scene.add(temp);
			init.objects.push(temp);
		});
	});
	
	var action = function(light) {
		if (!$('#' + light.name).length){
			var container = $('<div>', {id: light.name, class: 'container draggable animated rubberBand'});
			container.appendTo($(document.body));
			init.draggable();
			var cross = $('<div>', {class: 'cross'});
			cross.html('X');
			cross.on('click touchstart', function() {
				container.remove();
			});
			cross.appendTo(container);
			var switcher = $('<div>', {class: 'switcher'});
			switcher.on('click touchstart', function() {
				switchOnOff(light.lightUrl, put);
			});
			switcher.appendTo(container);
			var palette = $('<div>', {class: 'palette'});
			palette.appendTo(container);
			paletteCreator(light.lightUrl, palette);
			var slider = $('<div>', {id: 'slider'});
			slider.appendTo(container);
			$(function() {
				$( "#slider" ).slider({
					min: 0,
					max: 200,
					step: 25,
					slide: function( event, ui ) {
						changeLightBright(light.lightUrl, ui.value);
						console.log(ui.value);
				  }
				});
		  	});
		}
		//changeLightBright(light.lightUrl,200);
		//changeLightColor(light.lightUrl, 65000);
		//switchOnOff(light.lightUrl, put);
	};
	
	var paletteCreator = function(url, palette) {
		for (var i = 0; i < 11; i++) {
			var temp = $('<div>', {id: i, class: 'color', style: "background-color: #" + colorTab[i][1] });
			temp.appendTo(palette);
		}
		$("#color").click(function() {
			console.log(colorTab[$(this).attr('id')][0]);
		});
	};
	
	/*
	function test(temp, url, i) {
		temp.on('click', function(i) {
			changeLightColor(url, colorTab[i][0]);
		});
	}
	*/
	var put = function(url, property, value) {
		var http = new XMLHttpRequest();
        http.open('PUT', url + '/state', true);
        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
					console.log(http);
                }
                else {
                    console.log("Error " + http.status);
                }
            }
		};
        http.send('{"' + property + '":' + value + '}');
	};
	
	var switchOnOff = function(url, callback) {
		var http = new XMLHttpRequest();
        http.open('GET', url, true);
        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
					if(JSON.parse(http.response).state.on) {
						callback(url, 'on', false);	
					}
					else {
						callback(url, 'on', true);	
					}
                }
                else {
                    console.log("Error " + http.status);
                }
            }
		};
        http.send('');
	};
	
	var changeLightColor = function(url, color) {
		put(url, 'hue', color);
	};
	
	var changeLightBright = function(url, bright) {
		put(url, 'bri', bright);
	};
});