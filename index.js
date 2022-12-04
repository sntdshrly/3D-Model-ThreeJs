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
window.addEventListener('resize', (evt) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
controls = new THREE.OrbitControls(camera, renderer.domElement);
// Light
hlight = new THREE.AmbientLight(0x404040, 0.2);
scene.add(hlight);
directionalLight = new THREE.DirectionalLight(0x696880, 100);
directionalLight.position.set(0,500,500);
directionalLight.castShadow = true;
scene.add(directionalLight);
light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(-500, 100, 0);
scene.add(light);
light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(500, 100, 0);
scene.add(light2);
light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 100, -500);
scene.add(light3);
light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(0, 100, 500);
scene.add(light4);
// Helper
// const helper01 = new THREE.PointLightHelper(directionalLight,200,new THREE.Color(1,0,0));
// scene.add(helper01);
const helper02 = new THREE.DirectionalLightHelper(directionalLight, 200, new THREE.Color(1, 0, 0));
scene.add(helper02);
// Texture
const grassTexture = new THREE.TextureLoader().load('assets/grass/grass1-albedo3.png');
const grassTextureAo = new THREE.TextureLoader().load('assets/grass/grass1-ao.png');
const grassTextureHeight = new THREE.TextureLoader().load('assets/grass/grass1-height.png');
const grassTextureNormal = new THREE.TextureLoader().load('assets/grass/grass1-normal1-ogl.png');
// Car
let loader = new THREE.GLTFLoader();
loader.load('assets/scene.gltf', function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(0.25, 0.25, 0.25);
    car.position.set(0, 0, 0);
    scene.add(gltf.scene);
    directionalLight.target = gltf.scene;
});
// Floor
const geo = new THREE.BoxGeometry(5000, 10, 5000);
const mat = new THREE.MeshBasicMaterial({ map: grassTexture });
// const mat = new THREE.MeshLambertMaterial({map:grassTexture, aoMap: grassTextureAo, bumpMap: grassTextureHeight, normalMap: grassTextureNormal});
const floor = new THREE.Mesh(geo, mat);
floor.position.set(0, -100, 0);
floor.receiveShadow = true;
scene.add(floor);
// Animate
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();