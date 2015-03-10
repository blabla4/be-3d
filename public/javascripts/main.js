require.config({
  paths: {
		domReady: 'libs/domReady',
		colladaLoader: 'libs/colladaLoader',
		orbitControls: 'libs/orbitControls',
		three: 'libs/three',
		renderer: 'app/renderer'
  }
});

require(['domReady',], function(domReady){
	domReady(function() {
		require(['renderer'], function(renderer) {
			renderer.show('https://dl.dropboxusercontent.com/u/75902491/renduBlender.dae');
			return;
		});
	});
});