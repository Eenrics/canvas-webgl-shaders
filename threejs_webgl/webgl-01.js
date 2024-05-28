global.THREE = require('three');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  dimensions: [ 1024, 1280 ],
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1.0);

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  const palette = random.pick(palettes)

  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // Basic "unlit" material with no depth

for (let i = 0; i < 40; i++) {
  const mesh = new THREE.Mesh(
    geometry, 
    new THREE.MeshBasicMaterial({
      color: random.pick(palette)
    })
  );

  // Smaller cube
  mesh.position.set(
    random.range(-1, 1),
    random.range(-1, 1),
    random.range(-1, 1),
  )
  mesh.scale.set(
    random.range(-1, 1),
    random.range(-1, 1),
    random.range(-1, 1),
  )
  mesh.scale.multiplyScalar(0.5);

  // Then add the group to the scene
  scene.add(mesh);
}

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time }) {
      renderer.render(scene, camera);
    },

    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
