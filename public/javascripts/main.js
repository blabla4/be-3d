require.config({
  paths: {
		domReady: 'libs/domReady',
		three: 'libs/three',
		colladaLoader: 'libs/colladaLoader',
		orbitControls: 'libs/orbitControls',
		jquery: 'libs/jquery',
		init: 'app/init',
		room: 'app/room',
		camera: 'app/camera',
		cookie: 'app/cookie',
		light: 'app/light',
		conf: 'app/conf',
		lock: 'app/lock',
		events: 'app/events'
  },
	shim: {
		'colladaLoader': {
			deps: ['three']
		},
		'orbitControls': {
			deps: ['three']
		}
	}
});

require(['domReady',], function(domReady){
	domReady(function() {
		require(['room', 'camera', 'cookie', 'light', 'lock', 'events'], function(room) {
			room.show('https://dl.dropboxusercontent.com/u/75902491/renduBlender.dae');
			return;
		});
	});
});