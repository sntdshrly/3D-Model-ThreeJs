class Floor {
  static grassFloor(scene) {
    const floorTexture = new THREE.TextureLoader().load('assets/ground/Concrete_019_BaseColor.jpg');
    const floorTextureAo = new THREE.TextureLoader().load('assets/ground/Concrete_019_AmbientOcclusion.jpg');
    const floorTextureHeight = new THREE.TextureLoader().load('assets/ground/Concrete_019_Height.png');
    const floorTextureRoughness = new THREE.TextureLoader().load('assets/ground/Concrete_019_Roughness.jpg');
    const floorTextureNormal = new THREE.TextureLoader().load('assets/ground/Concrete_019_Normal.jpg');

    const geo = new THREE.BoxGeometry(1700, 10, 20000);
    // const mat = new THREE.MeshBasicMaterial({ map: floorTexture });
    const mat = new THREE.MeshLambertMaterial({map:floorTexture, aoMap: floorTextureAo, bumpMap: floorTextureHeight, normalMap: floorTextureNormal});
    const floor = new THREE.Mesh(geo, mat);
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);
    return floor;
  }

  static floor(scene) {
    const floorTexture = new THREE.TextureLoader().load('assets/ground/coast_land_rocks_01_diff_4k.jpg');
    const floorTextureAo = new THREE.TextureLoader().load('assets/ground/coast_land_rocks_01_ao_4k.jpg');
    const floorTextureRoughness = new THREE.TextureLoader().load('assets/ground/coast_land_rocks_01_rough_4k.jpg');
    const floorTextureNormal = new THREE.TextureLoader().load('assets/ground/coast_land_rocks_01_nor_gl_4k.jpg');

    const geo = new THREE.BoxGeometry(20000, 10, 20000);
    const mat = new THREE.MeshLambertMaterial({map:floorTexture, aoMap: floorTextureAo, bumpMap: floorTextureRoughness, normalMap: floorTextureNormal});
    const floor = new THREE.Mesh(geo, mat);
    floor.position.set(0, -10, 0);
    floor.receiveShadow = true;
    scene.add(floor);
    return floor;
  }
}
