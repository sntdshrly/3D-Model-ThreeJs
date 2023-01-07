// Variable
let scene, camera, renderer;
let isSlowDown = false;
let isAccel = false;
let speed = 0;
let maxSpeed = 25;
let rotation_ban;
let tacho = 0;
let gas = 1;
let mileage = 0;
let isKlakson = false;

// Speedometer
let turnSignalsStates = {
  'left':  false,
  'right': false
}
let iconsStates = {
  // main circle
  'dippedBeam': 0,
  'brake':      0,
  'drift':      0,
  'highBeam':   0,
  'lock':       1,
  'seatBelt':   1,
  'engineTemp': 2,
  'stab':       2,
  'abs':        2,
  // right circle
  'gas':        0,
  'trunk':      0,
  'bonnet':     0,
  'doors':      0,
  // left circle
  'battery':    0,
  'oil':        0,
  'engineFail': 0
}
function redraw() {
  draw(speed/maxSpeed, tacho/4, gas, mileage, turnSignalsStates, iconsStates);
}

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
  rotation_ban = [ban1.rotation.x, ban2.rotation.x, ban1.rotation.z, ban2.rotation.z];
  controls.target = car.position;
});

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("assets/sound/driving.ogg", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1);
});
function gasSound() {
  if (isAccel) {
    sound.play();
  } else {
    sound.stop();
  }
}

// Klakson
const listenerKlakson = new THREE.AudioListener();
camera.add(listenerKlakson);
const soundKlakson = new THREE.Audio(listenerKlakson);
const klaksonLoader = new THREE.AudioLoader();
klaksonLoader.load("assets/sound/klakson.ogg", function (buffer) {
  soundKlakson.setBuffer(buffer);
  soundKlakson.setLoop(true);
  soundKlakson.setVolume(1);
});
function klaksonSound() {
  if (isKlakson) {
    soundKlakson.play();
  } else {
    soundKlakson.stop();
  }
}

// Controlling car
let state = [];
document.body.addEventListener("keydown", (ev) => {
  isSlowDown = false;
  isStop = false;
  if (speed < maxSpeed && !(ev.key == "a" || ev.key == "d" || ev.key == "ArrowLeft" || ev.key == "ArrowRight")) {
    speed += 0.1;
    tacho += 0.01;
    gas -= 0.001;
  }
  // sound.play();
  state[ev.key] = true;
  // console.log(state);
});
document.body.addEventListener("keyup", (ev) => {
  isSlowDown = true;
  if (ev.key == "a" || ev.key == "d" || ev.key == "ArrowLeft" || ev.key == "ArrowRight" || ev.key == "Enter" || ev.key == "x") {
    state[ev.key] = false;
  }
  // console.log(state);
});

function controlling() {
  if (state["w"] || state["ArrowUp"]) {
    // Maju
    car.position.z += speed;
    camera.position.z += speed;
    ban1.rotation.z = rotation_ban[2];
    ban2.rotation.z = rotation_ban[3];
    ban1.rotation.x += speed;
    ban2.rotation.x += speed;
    ban3.rotation.x += speed;
    ban4.rotation.x += speed;
    // sound.play();
    isAccel = true;
    if (speed < 1) {
      state["w"] = false;
      state["ArrowUp"] = false;
      isAccel = false;
    }
    if (state['s'] || state['ArrowDown']) {
      isSlowDown = true;
      state["w"] = false;
      state["ArrowUp"] = false;
    }
  }
  if (state["s"] || state["ArrowDown"]) {
    // Mundur
    car.position.z -= speed;
    camera.position.z -= speed;
    ban1.rotation.z = rotation_ban[2];
    ban2.rotation.z = rotation_ban[3];
    ban1.rotation.x -= speed;
    ban2.rotation.x -= speed;
    ban3.rotation.x -= speed;
    ban4.rotation.x -= speed;
    isAccel = true;
    // sound.play();
    if (speed < 1) {
      state["s"] = false;
      state["ArrowDown"] = false;
      isAccel = false;
    }
    if (state['w'] || state['ArrowUp']) {
      isSlowDown = true;
      state["s"] = false;
      state["ArrowDown"] = false;
    }
  }
  if (state["a"] || state["ArrowLeft"]) {
    // Putar kanan
    if (!(state['w'] || state['ArrowUp']) && !(state["s"] || state["ArrowDown"])) { 
      ban1.rotation.x = rotation_ban[0];
      ban2.rotation.x = rotation_ban[1];
    }
    
    if (ban1.rotation.z < 3.75) { 
      ban1.rotation.z += 0.01;
      ban2.rotation.z += 0.01;
    }
  }
  if (state["d"] || state["ArrowRight"]) {
    // Putar kiri
    if (!(state['w'] || state['ArrowUp']) && !(state["s"] || state["ArrowDown"])) { 
      ban1.rotation.x = rotation_ban[0];
      ban2.rotation.x = rotation_ban[1];
    }
    if (ban1.rotation.z > 2.5) { 
      ban1.rotation.z -= 0.01;
      ban2.rotation.z -= 0.01;
    }
  }
  // Rem
  if(state[" "]){
      isStop = true;
  }
  // Klakson
  if(state["x"]){
    isKlakson = true;
    console.log(isKlakson);
}
}

function slowDown() {
  if (isSlowDown && speed > 0) {
    speed -= 0.1;
    tacho -= 0.01;
  } else {
    isSlowDown = false;
    // speed = 0;
    // sound.stop();
  }
}

function stop() {
  if (isStop && speed > 0) {
    speed -= 0.2;
    tacho -= 0.02;
  } else {
    isStop = false;
    state[" "] = false;
    // speed = 0;
    // sound.stop();
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

// Rain
// let rain;
// let rainCount = 15000;
// let vertices = [];
// rainGeo = new THREE.BufferGeometry();
// for(let i=0;i<rainCount;i++) {
//   rainDrop = new THREE.Vector3(
//     Math.random() * 400 -200,
//     Math.random() * 500 - 250,
//     Math.random() * 400 - 200
//   );
//   vertices.push(rainDrop);
// }
// rainMaterial = new THREE.PointsMaterial({
//   color: 0xaaaaaa,
//   size: 1000,
//   transparent: true
// });
// rainGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
// rain = new THREE.Points(rainGeo,rainMaterial);
// scene.add(rain);
// scene.fog = new THREE.Fog(0xDFE9F3, 10, 5000);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  controls.update();
  controlling();
  slowDown();
  stop();
  redraw();
  gasSound();
  // console.log(state);
  // ban1.rotation.z += 0.01;
}
redraw();
animate();
