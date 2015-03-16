require.config({
  paths: {
		domReady: 'libs/domReady',
		three: 'libs/three',
		colladaLoader: 'libs/colladaLoader',
		orbitControls: 'libs/orbitControls',
		jquery: 'libs/jquery',
	  	jqueryui: 'libs/jquery-ui', 
		highcharts: 'libs/highcharts',
		interact: 'libs/interact',
		init: 'app/init',
		room: 'app/room',
		camera: 'app/camera',
		cookie: 'app/cookie',
		light: 'app/light',
		conf: 'app/conf',
		lock: 'app/lock',
		interaction: 'app/interaction',
		tv: 'app/tv',
		shader: 'app/shader',
		animate: 'app/animate'
  },
	shim: {
		'colladaLoader': {
			deps: ['three']
		},
		'orbitControls': {
			deps: ['three']
		},
		'highcharts': {
			deps: ['jquery']
		}
	}
});

require(['domReady',], function(domReady){
	domReady(function() {
		require(['room', 'animate', 'camera', 'cookie', 'light', 'lock', 'interaction', 'tv'], function(room, animate) {
			room.show('https://dl.dropboxusercontent.com/u/75902491/renduBlender.dae');
			animate.start();
			return;
		});
	});
});