// Daniel Fernandes - 2019 - https://github.com/Carnaux/ClientSideOBJ-MTLLoader


class ModelLoader{
    constructor(scene){
      this.loadedModels = [];
      this.loadedMaterials = [];
      this.scene = scene;
    }

   

    onModelLoad(event) {
      let modelData = event.target.result;

      let objLoader = new THREE.OBJLoader();

      let geometry = objLoader.parse(modelData);
      let pos = new THREE.Vector3(0, 0, 0);

      if (geometry.children.length > 0) {
        for (let i = 0; i < geometry.children.length; i++) {
          let obj = new THREE.Mesh(
            geometry.children[i].geometry,
            geometry.children[i].material
          );
          obj.position.copy(pos);
          this.loadedModels.push(obj);
        }
      } else {
        let obj = new THREE.Mesh(geometry.geometry, geometry.material);
        obj.position.copy(pos);

        this.loadedModels.push(obj);
      }
      
      this.value = "";
    }

    onMaterialLoad(event) {
      let materialData = event.target.result;
      let mtlLoader = new THREE.MTLLoader();
      let material = mtlLoader.parse(materialData);
      let info = material.materialsInfo;
      let tempMat = [];
      let newMatArr;

      for (let name in info) {
          let newM = material.createMaterial_(name);
          tempMat.push(newM);
      }

      if(tempMat.length > 1){
          newMatArr = material.getAsArray();
          this.loadedMaterials.push(newMatArr);
      }else if(tempMat.length == 1){
          this.loadedMaterials.push(tempMat[0]);
      }
      if (this.loadedMaterials.length > 0) {
        console.log("materials loaded");
      } else {
        console.log("no materials loaded");
      }
    }

    fileChoosen(event, type) {
      if (typeof window.FileReader !== "function")
        throw "The file API isn't supported on this browser.";
      let input = event.target;
      if (!input) throw "The browser does not properly implement the event object";
      if (!input.files)
        throw "This browser does not support the `files` property of the file input.";
      if (!input.files[0]) return undefined;
      let file = input.files[0];
      let fr = new FileReader();
      if(type === "model"){
        fr.onload = this.onModelLoad.bind(this);
      }else if(type === "material"){
        fr.onload = this.onMaterialLoad.bind(this);
      }
      
      fr.readAsText(file);
    }

    load() {
      if (this.loadedMaterials.length > 0) {
        for (let i = 0; i < this.loadedModels.length; i++) {
          this.loadedModels[i].material = this.loadedMaterials[i];
          this.loadedModels[i].needsUpdate = true;
          this.scene.add(this.loadedModels[i]);
        }
      } else {
        for (let i = 0; i < this.loadedModels.length; i++) {
          this.scene.add(this.loadedModels[i]);
        }
      }
    }
}