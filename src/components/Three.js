import * as THREE from 'three'
import { TweenMax } from 'gsap'
import { randomColor } from 'randomcolor'
import OrbitControls from 'three-orbitcontrols'
import Favicon from '../assets/favicon.png'
const nbObjects = 500
var conf, scene, camera, cameraCtrl, light, renderer
var whw, whh

var objects
var spriteMap, spriteMaterial

var mouse = new THREE.Vector2()
var mouseOver = false
var mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
var mousePosition = new THREE.Vector3()
var raycaster = new THREE.Raycaster()

export function initAction () {
  conf = {
    opacity: 0.8
  }

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  cameraCtrl = new OrbitControls(camera)
  cameraCtrl.autoRotate = true
  cameraCtrl.autoRotateSpeed = 5
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.querySelector('.three').appendChild(renderer.domElement)

  initScene()

  onWindowResize()
  window.addEventListener('resize', onWindowResize, false)
  animate()
}

function initScene () {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera.position.z = 30
  camera.position.y = 20
  camera.lookAt(0, 0, 0)

  spriteMap = new THREE.Texture()
  var bubble = new Image()
  // bubble.src = 'data:image/jpeg;base64,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'
  bubble.src = Favicon
  bubble.onload = function () {
    spriteMap.image = bubble
    spriteMap.needsUpdate = true
  }

  objects = []
  for (let i = 0; i < nbObjects; i++) {
    var object = new Truc()
    objects.push(object)
    scene.add(object.sprite)
  }
}

function animate () {
  requestAnimationFrame(animate)

  cameraCtrl.update()

  renderer.render(scene, camera)
}

function Truc () {
  this.init()
  this.shuffle()
}

Truc.prototype.init = function () {
  this.material = new THREE.SpriteMaterial({
    color: randomColor({ luminosity: 'light' }),
    map: spriteMap,
    transparent: true,
    opacity: 1,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
  this.sprite = new THREE.Sprite(this.material)
}

Truc.prototype.shuffle = function () {
  this.scale1 = 0.1
  this.scale2 = 2 + rnd(3)
  this.sprite.scale.set(this.scale1, this.scale1, 1)

  var rndv = getRandomVec3()
  this.sprite.position.set(rndv.x, rndv.y, rndv.z).multiplyScalar(50)
  this.sprite.position.y -= 25

  this.material.opacity = conf.opacity

  this.tt = this.scale2
  TweenMax.to(this.sprite.scale, 1, {
    x: this.scale2,
    y: this.scale2,
    ease: Power2.easeIn
  })
  TweenMax.to(this.sprite.position, this.scale2, {
    y: this.sprite.position.y + 100,
    ease: Power2.easeIn
  })

  this.t1 = 1
  TweenMax.to(this.sprite.position, this.t1, {
    x: this.sprite.position.x + rnd(10, true),
    z: this.sprite.position.z + rnd(10, true),
    ease: Linear.ease,
    repeat: Math.floor(this.tt / this.t1 / 2),
    yoyo: true
  })

  TweenMax.to(this.material, 1, {
    opacity: 0,
    delay: this.tt - 1,
    ease: Power2.easeIn,
    onCompleteParams: [this],
    onComplete: function (o) {
      o.shuffle()
    }
  })
}

function getRandomVec3 () {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random())
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const x = r * sinPhi * cosTheta
  const y = r * sinPhi * sinTheta
  const z = r * cosPhi
  return { x: x, y: y, z: z }
}

function rnd (max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max
}

function onWindowResize () {
  whw = window.innerWidth / 2
  whh = window.innerHeight / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
