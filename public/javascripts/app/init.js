define(['three', 'colladaLoader', 'orbitControls', 'jquery'], function(three, colladaLoader, orbitControls, $) {
  return {
    scene:  new THREE.Scene(),
		renderer: new THREE.WebGLRenderer({antialias:true}),
		camera: new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000),
		loader: new THREE.ColladaLoader(),
		locked: true
  };
});
