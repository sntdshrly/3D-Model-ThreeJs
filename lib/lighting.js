class Lighting {
  static worldLighting(scene) {
    // hlight = new THREE.AmbientLight(0x404040, 0.2);
    // scene.add(hlight);
    let directionalLight = new THREE.DirectionalLight(0x404040, 100);
    directionalLight.position.set(0, 500, 500);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    // light = new THREE.PointLight(0xc4c4c4, 10);
    // light.position.set(-500, 100, 0);
    // scene.add(light);
    // light2 = new THREE.PointLight(0xc4c4c4, 10);
    // light2.position.set(500, 100, 0);
    // scene.add(light2);
    // light3 = new THREE.PointLight(0xc4c4c4, 10);
    // light3.position.set(0, 100, -500);
    // scene.add(light3);
    // light4 = new THREE.PointLight(0xc4c4c4, 10);
    // light4.position.set(0, 100, 500);
    // scene.add(light4);
    // Helper
    // const helper01 = new THREE.PointLightHelper(directionalLight,200,new THREE.Color(1,0,0));
    // scene.add(helper01);
    const helper02 = new THREE.DirectionalLightHelper(directionalLight, 200, new THREE.Color(1, 0, 0));
    scene.add(helper02);
  }
}
