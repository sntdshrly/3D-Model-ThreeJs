class Camera {
  static get() {
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 7000);
    // camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = -1000;

    return camera;
  }
}
