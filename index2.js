// Variable
let scene, camera, renderer;
// Scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
// Camera
camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
camera.rotation.y = 45 / 180 * Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;
// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Orbit Controls
// window.addEventListener('resize', (evt) => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });
// controls = new THREE.OrbitControls(camera, renderer.domElement);
// Car
let loader = new THREE.GLTFLoader();
loader.load('assets/scene.gltf', function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(0.25, 0.25, 0.25);
    car.position.set(0, 0, 0);
    scene.add(gltf.scene);
    // directionalLight.target = gltf.scene;
});
// Controlling car
let state = [];
document.body.addEventListener('keydown',(ev)=>{
    console.log(ev);
    state[ev.key] = true
});
document.body.addEventListener('keyup',(ev)=>{
    console.log(ev);
    state[ev.key] = false
});
const speed = 5;
function controlling(){
    if(state['a']){
        console.log("maju")
        car.position.z += speed;
    }
}
// Animate
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controlling();
}
animate();