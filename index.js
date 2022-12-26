// Variable
let scene, camera, renderer;
let speed = 15;

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
loader.load("assets/car/car.gltf", function (gltf) {
  ban1 = gltf.scene.children[0].children[0].children[0].children[0];
  ban2 = gltf.scene.children[0].children[0].children[0].children[1];
  ban3 = gltf.scene.children[0].children[0].children[0].children[2];
  ban4 = gltf.scene.children[0].children[0].children[0].children[3];
  // console.log(gltf.scene);
  car = gltf.scene.children[0];
  car.scale.set(0.2, 0.2, 0.2);
  car.position.set(0, 0, 0);
  car.rotation.set(300, 0, 0);
  scene.add(gltf.scene);
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
    ban1.rotation.x += speed;
    ban2.rotation.x += speed;
    ban3.rotation.x += speed;
    ban4.rotation.x += speed;
  }
  if (state["s"] || state["ArrowDown"]) {
    // Mundur
    car.position.z -= speed;
    camera.position.z -= speed;
    ban1.rotation.x -= speed;
    ban2.rotation.x -= speed;
    ban3.rotation.x -= speed;
    ban4.rotation.x -= speed;
  }
  if (state["a"] || state["ArrowLeft"]) {
    // Putar kanan
    ban1.rotation.z += 0.01;
    ban2.rotation.z += 0.01;
  }
  if (state["d"] || state["ArrowRight"]) {
    // Putar kiri
    ban1.rotation.z -= 0.01;
    ban2.rotation.z -= 0.01;
  }
}

// Floor
Floor.grassFloor(scene);

// Background
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;
let loader_bg = new THREE.RGBELoader();
loader_bg.load("/assets/bg/kloppenheim_01_4k.hdr", function (texture) {
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
