class Lighting {
  static worldLighting(scene) {
    let hlight = new THREE.AmbientLight(0x404040, 1);
    scene.add(hlight);
    let directionalLight = new THREE.DirectionalLight(0x404040, 1);
    directionalLight.position.set(0, 400, 900);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    // let light = new THREE.PointLight(0xc4c4c4, 10);
    // light.position.set(-500, 100, 0);
    // scene.add(light);
    // let light2 = new THREE.PointLight(0xc4c4c4, 10);
    // light2.position.set(500, 100, 0);
    // scene.add(light2);
    // let light3 = new THREE.PointLight(0xc4c4c4, 10);
    // light3.position.set(0, 100, -500);
    // scene.add(light3);
    // let light4 = new THREE.PointLight(0xc4c4c4, 10);
    // light4.position.set(0, 100, 500);
    // scene.add(light4);
    // Helper
    // const helper01 = new THREE.PointLightHelper(light,200,new THREE.Color(1,0,0));
    // scene.add(helper01);
    // const helper02 = new THREE.PointLightHelper(light2,200,new THREE.Color(1,0,0));
    // scene.add(helper02);
    // const helper03 = new THREE.PointLightHelper(light3,200,new THREE.Color(1,0,0));
    // scene.add(helper03);
    // const helper04 = new THREE.PointLightHelper(light4,200,new THREE.Color(1,0,0));
    // scene.add(helper04);
    // const helperDir = new THREE.DirectionalLightHelper(directionalLight, 200, new THREE.Color(1, 0, 0));
    // scene.add(helperDir);
  }
}
