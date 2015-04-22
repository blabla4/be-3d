define(['init', 'conf', 'shader'], function(init, conf, shader) {
	var material = new THREE.MeshPhongMaterial({color: 0xffff00});

	conf.get('cookie', function(data) {
		data.cookies.forEach(function(cookie) {
			var sphereGeom = new THREE.SphereGeometry(20, 20, 0);
			var temp = new THREE.Mesh(sphereGeom, material);
			temp.position.set(cookie.x, cookie.y, cookie.z);
			temp.scale.set(0.01, 0.01, 0.01);
			temp.overdraw = true;
			temp.type = cookie.type;
			temp.name = cookie.name;
			temp.action = action;
			shader.createGlow(sphereGeom, temp.position, 0.018, material.color, true);
			init.scene.add(temp);
			init.objects.push(temp);
		});
	});

	var getTempData = function(cookie, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback(cookie, JSON.parse(xmlhttp.responseText).data);
			}
		};
		//xmlhttp.open("GET", "/api/formatedData/" + cookie.name, true);
		xmlhttp.open("GET", "http://10.134.15.1:4041/data/temperature/" + cookie.name, true);
		xmlhttp.send();
	};

	var getMotionData = function(cookie, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback(cookie, JSON.parse(xmlhttp.responseText));
			}
		};
		xmlhttp.open("GET", "http://10.134.15.1:4041/data/motion/" + cookie.name, true);
		xmlhttp.send();
	};

	var drawTempGraph = function(cookie, dataTemp) {
		console.log(dataTemp);
		$("[ id = '" + cookie.name + "'] .graph").highcharts({
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Variation of temperature'
			},
			subtitle: {
				text: 'Cookie: ' + cookie.name
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%e. %b. %Y',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Temperature (°C)'
				},
				min: 0
			},
			tooltip: {
				headerFormat: '<b>{point.x:%e. %b. %Y}</b><br>',
				pointFormat: '{point.y:.2f} °C'
			},
			plotOptions: {
				spline: {
					marker: {
						enabled: true
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Temperature',
				data: (function() {
						var value= [];
						dataTemp.forEach(function(item) {
							value.push({x: new Date(item.date), y: item.value});
						});
						return value;
					}())
			}]
		});
	};

	var drawMotionGraph = function(cookie, dataMotion) {
		console.log(dataMotion);
		$("[ id = '" + cookie.name + "'] .graph").highcharts({
	        chart: {
	          type: 'column'
	        },
	        title: {
	          text: 'Number of drink coffees'
	        },
	        subtitle: {
					text: 'Cookie: ' + cookie.name
			},
	        xAxis: {
	          categories: dataMotion.day
	        },
	        yAxis: {
	          min: 0,
	          title: {
	            text: 'Number of coffees'
	          }
	        },
	        tooltip: {
	          headerFormat: '<b>{point.key}</b><br>',
	          pointFormat: 'Number of coffees: {point.y:.0f}'
	        },
	        plotOptions: {
	          column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	          }
	        },
	        legend: {
				enabled: false
			},
	        series: [{
	          name: 'Coffees drink per days',
	          data: dataMotion.number
	        }]
	    });
	};


	var action = function(cookie) {
		if (!$("[ id = '"+cookie.name+"']").length){
			var container = $('<div>', {id: cookie.name, class: 'container draggable animated rubberBand'});
			container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				container.removeClass('animated rubberBand');
			});
			container.appendTo($(document.body));
			init.draggable();
			var cross = $('<div>', {class: 'cross'});
			cross.html('X');
			cross.on('click touchstart', function() {
				container.remove();
			});
			cross.appendTo(container);
			var graph = $('<div>', {class: 'graph'});
			graph.appendTo(container);
			if(cookie.type == 'temperature') {
				getTempData(cookie, drawTempGraph);
			}
			else {
				getMotionData(cookie, drawMotionGraph);
			}

		}
	};

	Highcharts.theme = {
		 colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
				"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		 chart: {
				backgroundColor: {
					 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					 stops: [
							[0, '#2a2a2b'],
							[1, '#3e3e40']
					 ]
				},
				style: {
					 fontFamily: "'Unica One', sans-serif"
				},
				plotBorderColor: '#606063'
		 },
		 title: {
				style: {
					 color: '#E0E0E3',
					 textTransform: 'uppercase',
					 fontSize: '20px'
				}
		 },
		 subtitle: {
				style: {
					 color: '#E0E0E3',
					 textTransform: 'uppercase'
				}
		 },
		 xAxis: {
				gridLineColor: '#707073',
				labels: {
					 style: {
							color: '#E0E0E3'
					 }
				},
				lineColor: '#707073',
				minorGridLineColor: '#505053',
				tickColor: '#707073',
				title: {
					 style: {
							color: '#A0A0A3'

					 }
				}
		 },
		 yAxis: {
				gridLineColor: '#707073',
				labels: {
					 style: {
							color: '#E0E0E3'
					 }
				},
				lineColor: '#707073',
				minorGridLineColor: '#505053',
				tickColor: '#707073',
				tickWidth: 1,
				title: {
					 style: {
							color: '#A0A0A3'
					 }
				}
		 },
		 tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.85)',
				style: {
					 color: '#F0F0F0'
				}
		 },
		 plotOptions: {
				series: {
					 dataLabels: {
							color: '#B0B0B3'
					 },
					 marker: {
							lineColor: '#333'
					 }
				},
				boxplot: {
					 fillColor: '#505053'
				},
				candlestick: {
					 lineColor: 'white'
				},
				errorbar: {
					 color: 'white'
				}
		 },
		 legend: {
				itemStyle: {
					 color: '#E0E0E3'
				},
				itemHoverStyle: {
					 color: '#FFF'
				},
				itemHiddenStyle: {
					 color: '#606063'
				}
		 },
		 credits: {
				style: {
					 color: '#666'
				}
		 },
		 labels: {
				style: {
					 color: '#707073'
				}
		 },
		 drilldown: {
				activeAxisLabelStyle: {
					 color: '#F0F0F3'
				},
				activeDataLabelStyle: {
					 color: '#F0F0F3'
				}
		 },
		 navigation: {
				buttonOptions: {
					 symbolStroke: '#DDDDDD',
					 theme: {
							fill: '#505053'
					 }
				}
		 },
		 rangeSelector: {
				buttonTheme: {
					 fill: '#505053',
					 stroke: '#000000',
					 style: {
							color: '#CCC'
					 },
					 states: {
							hover: {
								 fill: '#707073',
								 stroke: '#000000',
								 style: {
										color: 'white'
								 }
							},
							select: {
								 fill: '#000003',
								 stroke: '#000000',
								 style: {
										color: 'white'
								 }
							}
					 }
				},
				inputBoxBorderColor: '#505053',
				inputStyle: {
					 backgroundColor: '#333',
					 color: 'silver'
				},
				labelStyle: {
					 color: 'silver'
				}
		 },
		 navigator: {
				handles: {
					 backgroundColor: '#666',
					 borderColor: '#AAA'
				},
				outlineColor: '#CCC',
				maskFill: 'rgba(255,255,255,0.1)',
				series: {
					 color: '#7798BF',
					 lineColor: '#A6C7ED'
				},
				xAxis: {
					 gridLineColor: '#505053'
				}
		 },
		 scrollbar: {
				barBackgroundColor: '#808083',
				barBorderColor: '#808083',
				buttonArrowColor: '#CCC',
				buttonBackgroundColor: '#606063',
				buttonBorderColor: '#606063',
				rifleColor: '#FFF',
				trackBackgroundColor: '#404043',
				trackBorderColor: '#404043'
		 },
		 legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		 background2: '#505053',
		 dataLabelsColor: '#B0B0B3',
		 textColor: '#C0C0C0',
		 contrastTextColor: '#F0F0F3',
		 maskColor: 'rgba(255,255,255,0.3)'
	};
	Highcharts.setOptions(Highcharts.theme);
});
