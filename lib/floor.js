class Floor {
  static grassFloor(scene) {
    const grassTexture = new THREE.TextureLoader().load('assets/grass/grass1-albedo3.png');
    const grassTextureAo = new THREE.TextureLoader().load('assets/grass/grass1-ao.png');
    const grassTextureHeight = new THREE.TextureLoader().load('assets/grass/grass1-height.png');
    const grassTextureNormal = new THREE.TextureLoader().load('assets/grass/grass1-normal1-ogl.png');
    const geo = new THREE.BoxGeometry(5000, 10, 5000);
    const mat = new THREE.MeshBasicMaterial({ map: grassTexture });
    // const mat = new THREE.MeshLambertMaterial({map:grassTexture, aoMap: grassTextureAo, bumpMap: grassTextureHeight, normalMap: grassTextureNormal});
    const floor = new THREE.Mesh(geo, mat);
    floor.position.set(0, -100, 0);
    floor.receiveShadow = true;
    scene.add(floor);
  }
}
