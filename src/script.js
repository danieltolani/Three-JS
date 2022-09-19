import './style.css'
import * as THREE from 'three'
import { Group, Mesh } from 'three';
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// I'll need to call/access the canvas from the DOM, by
const canvas = document.querySelector(".webgl")

// console.log(OrbitControls)

// CURSOR
const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (event) =>{

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})


// I need a mesh
// The mesh contains two parameters - 
//   1. Is the geometry and the other is the materail

// First, I need to import the three.js library so I can use its methods.

// I need a scene where everthing (camera, lights and other objects) is placed.
const scene = new THREE.Scene()
// I need to place a mesh in the scene

// console.log(date.getMinutes())
// // Geometry 
// // Since I am trying to create a cube, best THREE.js geometry to use is the BOXGeometry which takes in three (3) values.
// // The BoxGeometry takes in three values for x-y-z axis
const geometry = new THREE.BoxGeometry(1,1,1)

// // Material
// // There are different types of material, but, just like nodes in blender, 
// //       we can add differnet types of materials in THREE.js, we currently use the MeshBasicMaterial since we just want to slap in a single color
// //       The MeshBasicMaterial takes in properties like 'color'
const material = new THREE.MeshBasicMaterial( { color: 0xe4ad7b } )

// // NOW, we can create our mesh which will take in the geometry and the material
const cubeMesh = new THREE.Mesh(geometry, material)
// // We need to add this mesh we have created too the scene

// // REORDER - Comes before the vector3D properties
// // A string must be passed in - telling how the arrangment should tae place
// cubeMesh.rotation.reorder('YXZ')
// cubeMesh.rotation.x = 120
// cubeMesh.rotation.y = 120
// cubeMesh.rotation.z = 120

// // Use of SET - reduce the XYZ properties of all Object3D class inheritance into one line of 3 parameters
// // cubeMesh.rotation.set(3,4,1)
// cubeMesh.position.set(0.8,0.2,1)

// //NORMALIZE
cubeMesh.position.normalize()

// LENGTH Method for position 
// console.log(cubeMesh.position.length())

// console.log(cubeMesh.position.distanceTo(new THREE.Vector3(1,1,3)))

// console.log(cubeMesh.position.distanceTo(camera.position))

scene.add(cubeMesh)


// CREATING A GROUP
// const cubeGroup = new THREE.Group();
// scene.add(cubeGroup)

// const mesh1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial( { color: 0x0000FF})
// )

// const mesh2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial( { color: 0x00FF00})
// )

// mesh2.position.set(1.3,0,0)

// const mesh3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial( { color: 0xFF0000})
// )

// mesh3.position.set(-1.3,0,0)

// cubeGroup.add(mesh1, mesh2, mesh3)

// cubeGroup.scale.y = 2
// cubeGroup.rotation.y = 1

// cubeGroup.rotation.z = 2
// We now need a camera to serve as our eyes in this scene
// There are different cameras in THREE.js but the one I'm using for this project is the Perspective camera which takes two values or more.
//    1. Is the Field of View  -  Takes in a Degree 
//    2. Is the aspect ration  - Takes in a size.. 
//    3. NEAR - Objects closer than the Near value won't show up
//    4. FAR - Objects farther than the far won't show up 

// We need to declare the size for the aspect ratio - In form objects where we assign a width and a height value.
// There are no specified units of measurement for the width and height


const sizes = {
    // width: window.innerWidth,
    // height: window.innerHeight
    width: window.innerWidth,
    height: window.innerHeight

    // width: 800,
    // height: 600
}

// RESIZE EVENT LISTENER
window.addEventListener('resize', () => {
    // console.log("I have been resized")

    // update sizes of screen
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight


    // Update the camera on resize
    // camera's aspect should be update date as we're using innerW and innerH as our aspect
    // For the changes to take effect, we need to call the updateprojectionMatrix
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // There's need to update the renderer
    // So that the canvas knows size to render from the new camera's aspect
    renderer.setSize(
        sizes.width, sizes.height
    )
    // Set PixelRatio
    // To have a more precise render
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) )

})

window.addEventListener('dblclick', () =>{

    // Declare the the prefixed and non-prefixed into a single variable
    // This is done so we can pass a single element as the condition for our IF statement

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || documsFullscreenElement

    if(!fullscreenElement){

        if(canvas.requestFullscreen){
            canvas.requestFullscreen()    
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
        else if(canvas.mozRequestFullscreen){
            canvas.mozRequestFullscreen()
        }
        else if(canvas.msRequestFullscreen){
            canvas.msFullscreenElement()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullScreen){
            document.webkitExitFullscreen()
        }
        else if(document.mozExitFullScreen){
            document.mozExitFullscreen()
        }
        else if(document.msExitFullScreen){
            document.msExitFullscreen()
        }
    }
})

// console.log(window.height)
// Now we can declare the camera and place the sizes in it.

// Orthogrophic Camera
// Scene will be renedered with NO perspective
// Size of object is always the same
// We need the L,B,F & B

// const aspectRatio = sizes.width / sizes.height

// console.log(aspectRatio)
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     1,
//     100)


const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height)

// const camera = new THREE.OrthographicCamera(-1,-1,1,1)
// We then need to add the camera to the scene

scene.add(camera)

// CONTROLS 
const controls = new OrbitControls(camera, canvas)
// console.log(controls)

// CHANGE TARGET
// controls.target.x = 1
// controls.update()

// AUTO ROTATE
controls.autoRotate = true 
controls.autoRotateSpeed = 2

// Damping 
// More like a overshoot & Interpolation combined
controls.enableDamping = true

// camera.position.y = 2
// camera.position.x = 2 

// By default the camera postion will be the scene (or 'world's') origin (as in blender)
// This makes it to be in the same position as the mesh (or inside of it) so, we cannot see anything
// so we move the position of the camera so we can see other faces of the mesh
camera.position.z = 3
camera.lookAt(cubeMesh.position)
// camera.rotation.x = 1.2
// console.log(cubeMesh.distanceTo(camera.position))
// camera.position.x = 2
// camera.position.y = 1

// AXES HELPER
// Helps with guides that show the three axis of the scene (x,y and z)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)


// FOR THE RENDERER
// We need a 'renderer' as the name implies to render what the camera sees.
// I'd like to think of this as cycles or EEVVEE in Blender (render engines)\
// It draws its output from the 'canvas' which is like the render region in blender.
// For this project I will be using the WebGl Renderer but there are others.
// The WebGL renderer displays the beautifully crafted scenes using WebGL



// The WebGlRenderer takes in objects as parameters
// This is where we pass the canvas

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

// Now, I render the scene or another type of object using a camera.
// now we can pass in the 

// I then, using the setSize constructor, Resize the output canvas to (width, height) with device pixel ratio taken into account
renderer.setSize(
    sizes.width, sizes.height
)


// TIME
// let Time = Date.now()


//GSAP
// console.log(gsap)
// gsap.to(cubeMesh.position, {x: 2, duration: 1, delay: 1})
// gsap.to(cubeMesh.position, {x: -2, duration: 2, delay: 2})


// CLOCK
const clock = new THREE.Clock()


// ANIMATION
// Request Animation Frame calls a function on each frame
const tickCalled = () => {

    const elapsedTIme = clock.getElapsedTime()

    // const currentTime = Date.now()

    // const deltaTime = currentTime-Time
    // Time = currentTime

    // console.log(deltaTime)
    
    // cubeMesh.rotation.z += 0.01 * deltaTime
    // cubeMesh.rotation.y += 0.008
    // cubeMesh.rotation.x += 0.02


    // Update Camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2)  * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5

    controls.update()
    // camera.lookAt(cubeMesh.position)


    // console.log(Math.sin(elapsedTIme) )
    // cubeMesh.position.y = Math.sin(elapsedTIme) 
    // cubeMesh.rotation.y = elapsedTIme * Math.PI * 2


    // cubeMesh.position.x = Math.tan(elapsedTIme) 
    // camera.lookAt(cubeMesh.position)
    renderer.render(scene, camera)

    // const time = Date.now()
    // console.log(time)

    window.requestAnimationFrame(tickCalled)
}

tickCalled();
