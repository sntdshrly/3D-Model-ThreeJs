class Camera {
  static get() {
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 7000);
    // camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 0;
    camera.position.y = 300;
    camera.position.z = -1500;

    return camera;
  }
}
