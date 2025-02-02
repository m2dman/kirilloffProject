
//Thak you Ateros!
let canvas = window.document.querySelector('#render-canvas');
// Создание движка
let engine = new BABYLON.Engine(canvas);
// Создание сцены и присоеденение ее к движку
let scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
scene.createDefaultEnvironment({
    createSkybox: false,
    createGround: false,
});

// Создание камеры
let camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10, -20), scene);
// camera.attachControl(canvas, true);
camera.checkCollisions = true;
camera.setTarget(BABYLON.Vector3.Zero());

// Создание света
let light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);


// // Создание куба
// let box = new BABYLON.Mesh.CreateBox('box', 2, scene);
// box.rotation.x = -0.2;
// box.rotation.y = -0.4;

// // Создание материала
// let boxMaterial = new BABYLON.StandardMaterial('material', scene);
// boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
// box.material = boxMaterial;

//коллизии


//вращение обьекта
const sensitive = 0.01
let pickMesh = null
let isRotating=false
let rotaDirection = 'all'
scene.onPointerObservable.add(evt =>{
    const x= evt.event.offsetX
    const y= evt.event.offsetY
    
    const camera = scene.activeCamera
    if(evt.type == 1){
        //pointerDown
        console.log('pointerDown',x,y,evt)
        let pickInfo = scene.pick(x,y)
        console.log('pick',pickInfo)
        if (pickInfo.hit){
            console.log('pick this')
            pickMesh = pickInfo.pickedMesh
            prePoint ={x,y}
            isRotating = true
            // camera.detachControl();
        }
    }
    if(evt.type ==4 && isRotating){
        //pointerMove
        const amountX =-(x- this.prePoint.x)* sensitive
        const amountY = -(y- this.prePoint.y)* sensitive
        // console.log('amountX', amountX)
        switch (rotaDirection){
            case'x':
            // console.log('x Rotate',amountX)
                pickMesh.rotate(new BABYLON.Vector3(0,1,0), -amountX)
                break
            case 'y':
                pickMesh.rotate(new BABYLON.Vector3(1,0,0), amountY)
                break
            case 'all':
                pickMesh.rotate(new BABYLON.Vector3(1,1,0), amountY, amountX)
                break
        }
        this.prePoint ={x,y}
    }
    if(evt.type ==2){
        //pointerUp
        console.log('pointerUp')
        // camera.attachControl()
        isRotating = false
    }
})



//самолет
function start () {
    document.getElementById('load').showModal()
    BABYLON.SceneLoader.ImportMesh(
        null,
        'PE-2/',
        'bomber.gltf',
        scene,
        (meshArray) =>{
            // let plane = meshArray[0];
            objects.push(meshArray[0]);
            plane.rotation.z = Math.PI/2;
        }
    )
    document.getElementById('load').close()
}

start()
// //танк

// let tank = BABYLON.SceneLoader.ImportMesh(
//     null,
//     'T-34/',
//     't34.gltf',
//     scene,
//     (meshArray) =>{
//         let t34 = meshArray[0];
//         t34.rotation.z = Math.PI/2;
//     }
// )





engine.runRenderLoop(()=>{
    scene.render();
})

// window.addEventListener('click', ()=>{
//     canvas.requestPointerLock()
// })


let model = null;
let objects = [];

if (objects.length>1){
    for(i=1; i<objects.length;i++){
        objects[i].dispose();
    }
}
// создание самолета

document.getElementById('plane').addEventListener('click',()=>{
    document.getElementById('load').showModal()
    for(i=0; i<objects.length;i++){
        objects[i].dispose()
        objects= []
    }
    model = 1
    console.log(model)
    BABYLON.SceneLoader.ImportMesh(
        null,
        'PE-2/',
        'bomber.gltf',
        scene,
        (meshArray) =>{
            // let plane = meshArray[0];
            objects.push(meshArray[0]);
            plane.rotation.z = Math.PI/2;
        }
    )
    document.getElementById('load').close()
})

//создание танка

document.getElementById('tank').addEventListener('click',()=>{
    document.getElementById('load').showModal()
    for(i=0; i<objects.length;i++){
        objects[i].dispose();
        objects= [];
    }
    model = 2
    console.log(model)
    BABYLON.SceneLoader.ImportMesh(
        null,
        'T-34/',
        't34.gltf',
        scene,
        (meshArray) =>{
            // let t34 = meshArray[0];
            objects.push(meshArray[0])
            t34.rotation.z = Math.PI/2;
        }
    )
    document.getElementById('load').close()
})

//создание бм-13

document.getElementById('katyusha').addEventListener('click',()=>{
    document.getElementById('load').showModal()
    for(i=0; i<objects.length;i++){
        objects[i].dispose();
        objects= [];
    }
    model = 3
    console.log(model)
    BABYLON.SceneLoader.ImportMesh(
        null,
        'katyusha/',
        'KATYUSHA-UNION.gltf',
        scene,
        (meshArray) =>{
            // let katyusha = meshArray[0];
            objects.push(meshArray[0])
            katyusha.rotation.z = Math.PI/2;
        }
    )
    document.getElementById('load').close()
})
