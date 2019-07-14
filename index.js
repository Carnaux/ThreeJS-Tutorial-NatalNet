let htmlCode = document.getElementById("htmlCode");
let htmlIcon = document.getElementById("htmlIcon");
let jsCode = document.getElementById("jsCode");
let jsIcon = document.getElementById("jsIcon");
let renderShadowCode = document.getElementById("renderShadowCode");
let renderShadowIcon = document.getElementById("renderShadowIcon");
let hemLightRange = document.getElementById("hemisphereRange");
let pointLightRange = document.getElementById("pointRange");
let lightCode = document.getElementById("lightCode");
let lightIcon = document.getElementById("lightIcon");
let cubeCode = document.getElementById("cubeCode");
let cubeIcon = document.getElementById("cubeIcon");
let objCode = document.getElementById("objCode");
let objIcon = document.getElementById("objIcon");

let mode1 = document.getElementById("mode1");

let mode2 = document.getElementById("mode2");
mode2.style.display="none";

let loaderMode = document.getElementById("loaderMode");

var sceneInitial, cameraInitial, cubeInitial, rendererInitial;
var sceneLight, cameraLight, cubeLight, rendererLight, pointLight, hemisphereLight;
var lightState = true;
var sceneControl, cameraControl, cubeControl, rendererControl, controls;
var sceneModel, cameraModel, cubeModel, rendererModel, modelLoader, controls1;
var sceneModel2, cameraModel2, cubeModel2, rendererModel2, modelLoader2, controls2, loader;

function play(n){
    switch(n){
        case 1:
            alternate(htmlCode);
            alternateIcon(htmlIcon);
            break; 
        case 2:
            alternate(jsCode);
            alternateIcon(jsIcon);
            break;
        case 3:
            alternate(renderShadowCode, "sm");
            alternateIcon(renderShadowIcon);
            break;
        case 4:
            alternate(lightCode, "sm");
            alternateIcon(lightIcon);
            break;
        case 5:
            alternate(cubeCode, "sm");
            alternateIcon(cubeIcon);
            break;
        case 6:
            alternate(objCode);
            alternateIcon(objIcon);
            break;
    }
}

function alternate(el, size){
    if(size == "sm"){
        if(el.classList.contains("animate-reverse-sm")){
            el.classList.remove("animate-reverse-sm");
            el.classList.add("animate-forward-sm");
        }else  if(el.classList.contains("animate-forward-sm")){
            el.classList.remove("animate-forward-sm");
            el.classList.add("animate-reverse-sm");
        }else{
            el.classList.add("animate-forward-sm");
        }
    }else{
        if(el.classList.contains("animate-reverse")){
            el.classList.remove("animate-reverse");
            el.classList.add("animate-forward");
        }else  if(el.classList.contains("animate-forward")){
            el.classList.remove("animate-forward");
            el.classList.add("animate-reverse");
        }else{
            el.classList.add("animate-forward");
        }
    }
    el.style.animationPlayState = "running";
}

function alternateIcon(el){
    if(el.classList.contains("fa-angle-down")){
        el.classList.remove("fa-angle-down");
        el.classList.add("fa-angle-up");
    }else  if(el.classList.contains("fa-angle-up")){
        el.classList.remove("fa-angle-up");
        el.classList.add("fa-angle-down");
    }
}

function initiThree(){
    initThreeInitial();
    initThreeLight();
    initThreeControl();
    initThreeModel();
    initThreeModel2();
}

function initThreeInitial(){
    let width = 500;
    let height = 300;
    sceneInitial = new THREE.Scene();
    cameraInitial = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

    rendererInitial = new THREE.WebGLRenderer();
    rendererInitial.setSize( width, height );
    let renderDiv = document.getElementById("initialRender");
    renderDiv.appendChild( rendererInitial.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cubeInitial = new THREE.Mesh( geometry, material );
    sceneInitial.add( cubeInitial );

    cameraInitial.position.z = 3;


    animateInitial();
}

function animateInitial() {
    requestAnimationFrame( animateInitial );

    cubeInitial.rotation.x += 0.01;
    cubeInitial.rotation.y += 0.01;

    rendererInitial.render( sceneInitial, cameraInitial );
}

function initThreeLight(){
    let width = 500;
    let height = 300;
    sceneLight = new THREE.Scene();
    cameraLight = new THREE.PerspectiveCamera( 75,  width/height, 0.1, 1000 );

    rendererLight = new THREE.WebGLRenderer();
    rendererLight.setSize( width, height );
    let renderDiv = document.getElementById("LightRender");
    renderDiv.appendChild( rendererLight.domElement );

    pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 10, 0 );
    pointLight.castShadow = true;            // default false
    sceneLight.add( pointLight );

    hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    sceneLight.add( hemisphereLight );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    cubeLight = new THREE.Mesh( geometry, material );
    sceneLight.add( cubeLight );

    cameraLight.position.z = 3;

    hemLightRange.addEventListener('change', hemLightChange);
    pointLightRange.addEventListener('change', pointLightChange);

    animateLight();
}

function animateLight() {
    requestAnimationFrame( animateLight );

    cubeLight.rotation.x += 0.01;
    cubeLight.rotation.y += 0.01;

    rendererLight.render( sceneLight, cameraLight );
}

function activatePointLight(){
    if(lightState){
        sceneLight.remove( pointLight );
        lightState = false;
    }else{
        sceneLight.add( pointLight );
        lightState = true;
    }
}

function hemLightChange(){
    hemisphereLight.intensity = hemLightRange.value;  
}

function pointLightChange(){
    pointLight.intensity = pointLightRange.value;
}

function initThreeControl(){
    let width = 500;
    let height = 300;
    sceneControl = new THREE.Scene();
    cameraControl = new THREE.PerspectiveCamera( 75,  width/height, 0.1, 1000 );

    rendererControl = new THREE.WebGLRenderer();
    rendererControl.setSize( width, height );
    let renderDiv = document.getElementById("controlRender");
    renderDiv.appendChild( rendererControl.domElement );

    cameraControl.position.z = 3;

    controls = new THREE.OrbitControls( cameraControl, rendererControl.domElement );  

    let pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 10, 0 );
    pointLight.castShadow = true;            // default false
    sceneControl.add( pointLight );

    let hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    sceneControl.add( hemisphereLight );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    cubeControl = new THREE.Mesh( geometry, material );
    sceneControl.add( cubeControl );

    

    animateControl();
}

function animateControl() {
    requestAnimationFrame( animateControl );
    controls.update();
    cubeControl.rotation.x += 0.01;
    cubeControl.rotation.y += 0.01;

    rendererControl.render( sceneControl, cameraControl );
}

function initThreeModel(){
    let width = 500;
    let height = 300;
    sceneModel = new THREE.Scene();
    sceneModel.background = new THREE.Color("rgb(120,120,120)")
    cameraModel = new THREE.PerspectiveCamera( 75,  width/height, 0.1, 1000 );

    rendererModel = new THREE.WebGLRenderer();
    rendererModel.setSize( width, height );
    let renderDiv = document.getElementById("modelRender1");
    renderDiv.appendChild( rendererModel.domElement );

    cameraModel.position.z = 3;

    controls1 = new THREE.OrbitControls( cameraModel, rendererModel.domElement );  

    let pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 10, 0 );
    pointLight.castShadow = true;            // default false
    sceneModel.add( pointLight );

    let hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    sceneModel.add( hemisphereLight );

 
    var mtlLoader = new THREE.MTLLoader();
    //Alterar o caminho para ser na mesma pasta
    objLoader.setPath( '../' );
    //nome do arquivo MTL
    var url = "Finn.mtl";
    mtlLoader.load( url, function( materials ) {
    
        materials.preload();
    
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        //Alterar o caminho para ser na mesma pasta
        objLoader.setPath( '../' );
        //nome do arquivo OBJ
        objLoader.load( 'finn.obj', function ( object ) {
    
            
            sceneModel.add( object );
    
        });
    
    });
   

    animateModel();
}

function animateModel() {
    requestAnimationFrame( animateModel );
    controls1.update();
    

    rendererModel.render( sceneModel, cameraModel );
}

function initThreeModel2(){
    let width = 500;
    let height = 300;
    sceneModel2 = new THREE.Scene();
    sceneModel2.background = new THREE.Color("rgb(120,120,120)")
    cameraModel2 = new THREE.PerspectiveCamera( 75,  width/height, 0.1, 1000 );

    rendererModel2 = new THREE.WebGLRenderer();
    rendererModel2.setSize( width, height );
    let renderDiv = document.getElementById("modelRender2");
    renderDiv.appendChild( rendererModel2.domElement );

    cameraModel2.position.z = 3;

    controls2 = new THREE.OrbitControls( cameraModel2, rendererModel2.domElement );  

    let pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 10, 0 );
    pointLight.castShadow = true;            // default false
    sceneModel2.add( pointLight );

    let hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    sceneModel2.add( hemisphereLight );

 
    loader = new ModelLoader(sceneModel2);
   

    animateModel2();
}

function animateModel2() {
    requestAnimationFrame( animateModel2 );
    controls2.update();
    

    rendererModel2.render( sceneModel2, cameraModel2 );
}

function showMode(n){
    if(n == 1){
        mode1.style.display = "block";
        mode2.style.display = "none";
        loaderMode.textContent = "OBJ/MTL loader";
    }else if(n == 2){
        mode1.style.display = "none";
        mode2.style.display = "block";
        loaderMode.textContent = "modelLoader.js";
    }
}

function onChooseFile(e, type){
    loader.fileChoosen(e, type);
}

function loadOBJMTL(){
    loader.load();
}



window.onload = initiThree;
