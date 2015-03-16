define(['three', 'colladaLoader', 'orbitControls', 'jquery', 'interact', 'highcharts', 'jqueryui'], function(three, colladaLoader, orbitControls, $, interact) {
  return {
    scene:  new THREE.Scene(),
		renderer: new THREE.WebGLRenderer({antialias:true}),
		camera: new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000),
		loader: new THREE.ColladaLoader(),
		objects: [],
		shaders: [],
		locked: true,
		draggable: function() {
			interact('.draggable')
				.draggable({
					inertia: true,
					restrict: {
						restriction: "parent",
						endOnly: true,
						elementRect: {
							top: 0,
							left: 0,
							bottom: 1,
							right: 1
						}
					},
					onmove: function(event) {
						var target = event.target,
						x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
						y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
						target.style.webkitTransform =
						target.style.transform =
						'translate(' + x + 'px, ' + y + 'px)';
						target.setAttribute('data-x', x);
						target.setAttribute('data-y', y);
					},
					onend: function(event) {
					}
				});
		}
  };
});
