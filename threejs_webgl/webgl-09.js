global.THREE = require('three');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const eases = require('eases')
const BazierEasing = require('bezier-easing')

const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  dimensions: [ 512, 512 ],
  fps: 24,
  duration: 4,
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

  const fragmentShader = /* glsl */`
    varying vec2 vUv;
    uniform vec3 color;
    void main () {
      gl_FragColor = vec4(vec3(color * vUv.x), 1.0);
    }
  `;

const vertexShader = /* glsl */`
  varying vec2 vUv;
  uniform float time;
  void main () {
    vUv = uv;
    vec3 pos = position.xyz * sin(time);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // Basic "unlit" material with no depth

  const meshes = []
for (let i = 0; i < 40; i++) {
  const mesh = new THREE.Mesh(
    geometry, 
    new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        color: {value: new THREE.Color(random.pick(palette))},
        time: {value: 0}
      },
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
  meshes.push(mesh)
}

scene.add(new THREE.AmbientLight('hsl(0, 0%, 20%)'))

const light = new THREE.DirectionalLight('white', 1)
light.position.set(0, 0, 4)
scene.add(light)

const easeFn = BazierEasing(.02,1.7,.42,-0.14)
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
    render ({ playhead, time }) {
      const t = Math.sin(playhead * Math.PI)
      // scene.rotation.z = easeFn(t)
      scene.rotation.z = eases.expoInOut(t)
      meshes.forEach(mesh => {
        mesh.material.uniforms.time.value = time
      })
      renderer.render(scene, camera);
    },

    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
