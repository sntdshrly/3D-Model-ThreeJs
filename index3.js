// Variable
let scene, camera, renderer;
let speed = 5;

// Scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Camera
camera = Camera.get();

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
Lighting.worldLighting(scene);

// Car
let loader = new THREE.GLTFLoader();
loader.load("assets/scene.gltf", function (gltf) {
  car = gltf.scene.children[0];
  car.scale.set(0.25, 0.25, 0.25);
  car.position.set(0, 0, 0);
  scene.add(gltf.scene);
});


// Floor
Floor.grassFloor(scene);

// Background
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;
let loader_bg = new THREE.RGBELoader();
loader_bg.load("/assets/bg/forest_4k.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();