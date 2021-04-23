// scene and camera set up
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 800)
camera.position.z = 20;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor('#DCD3C9');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize',() => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// lights setting
var light = new THREE.PointLight(0xFFFFFF, 1, 800)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 800)
light.position.set(0,0,35);
scene.add(light); 

// object01 top
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x27685F});
var mesh01 = new THREE.Mesh(geometry, material);
mesh01.position.y = 2
scene.add(mesh01);


// object02 bottom
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x27685F});
var mesh02 = new THREE.Mesh(geometry, material);
mesh02.position.y = -3.5;
scene.add(mesh02);


// object01 move to right GSAP
this.tl = new TimelineMax().delay(1);
this.tl.to(this.mesh01.scale, 1, {x: 2, ease: Expo.easeOut})
this.tl.to(this.mesh01.scale, .5, {x: 1, ease: Expo.easeOut})
this.tl.to(this.mesh01.position, .5, {x: 4, ease: Expo.easeOut})
this.tl.to(this.mesh01.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")

// object02 move to left GSAP
this.tl = new TimelineMax().delay(1);
this.tl.to(this.mesh02.scale, 1, {x: 3, ease: Expo.easeOut})
this.tl.to(this.mesh02.scale, .5, {x: 1, ease: Expo.easeOut})
this.tl.to(this.mesh02.position, .5, {x: -4, ease: Expo.easeOut})
this.tl.to(this.mesh02.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")


// object animation - rotation
var render = function() {
    requestAnimationFrame(render);
    mesh01.rotation.y += 0.005;
    mesh02.rotation.y += 0.005;
    renderer.render(scene, camera);
}


// object animation - hover to change colour
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i ++ ) {
        intersects[i].object.material.color.set( 0xFF8960 );
    }
}

render();

window.addEventListener('mousemove', onMouseMove);

// object animation - click to transform
function Click(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: 1, ease: Expo.easeOut})
    }
}

render();

window.addEventListener('click', Click);

