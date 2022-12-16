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

// Orbit Controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

// Light
Lighting.worldLighting(scene);

// Car
let loader = new THREE.GLTFLoader();
loader.load("assets/scene.gltf", function (gltf) {
  car = gltf.scene.children[0];
  car.scale.set(0.25, 0.25, 0.25);
  car.position.set(0, 0, 0);
  scene.add(gltf.scene);
  // directionalLight.target = gltf.scene;
});

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("assets/sound/driving.ogg", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
});

// Controlling car
let state = [];
document.body.addEventListener("keydown", (ev) => {
  state[ev.key] = true;
  sound.play();
});
document.body.addEventListener("keyup", (ev) => {
  state[ev.key] = false;
  sound.stop();
});
function controlling() {
  if (state["w"] || state["ArrowUp"]) {
    // Maju
    car.position.z += speed;
    camera.position.z += speed;
  }
  if (state["s"] || state["ArrowDown"]) {
    // Mundur
    car.position.z -= speed;
    camera.position.z -= speed;
  }
  if (state["a"] || state["ArrowLeft"]) {
    // Putar kanan
    car.rotation.z += 0.01;
  }
  if (state["d"] || state["ArrowRight"]) {
    // Putar kiri
    car.rotation.z -= 0.01;
  }
}

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
  controlling();
}
animate();
