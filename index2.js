// Variable
let scene, camera, renderer;
// Scene
scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);
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
// Background
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;
let loader_bg =  new THREE.RGBELoader();
loader_bg.load('/assets/bg/forest_4k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});
// Animate
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();