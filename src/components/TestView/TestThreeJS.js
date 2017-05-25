import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import Expo from 'expo'
import * as THREE from 'three'
import {Cursor} from '../Vr'

const {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  PerspectiveCamera,
  Scene
} = THREE

const {width, height} = Dimensions.get('window')
const aspect = width / height
const near = 0.1
const far = 10000

export default class TestThreeJS extends Component {
  ThreeView = Expo.createTHREEViewClass(THREE)
  state = {
    fov: 75,
    hotspots: []
  }

  componentWillMount () {
    this.setupScene()
    this.loadPano()
    this.loadHotspots()
  }

  setupScene () {
    this.scene = new Scene()
    this.scene.name = 'scene'

    this.camera = new PerspectiveCamera(this.state.fov, aspect, near, far)
    this.camera.name = 'camera'
    this.camera.target = new THREE.Vector3(0, 0, 0)

    this.cursor = new Cursor(this.camera)
    this.cursor.name = 'cursor'

    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.name = 'directionalLight'
    directionalLight.position.set(1, 1, 1)
    this.camera.add(directionalLight)

    const ambientLight = new AmbientLight(0xFFFFFF)
    ambientLight.name = 'ambientLight'
    this.scene.add(ambientLight)
  }

  loadPano () {
    const panoGeometry = new THREE.SphereGeometry(500, 60, 40)
    panoGeometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1))

    const panoMaterial = loadImageMaterial('pano', this.ThreeView)
    console.log('panoMaterial', panoMaterial)

    // const img = require('../equirectangle.jpg')
    // const textureLoader = new TextureLoader()
    // textureLoader.load(img, (texture) => {
    //   console.log('texture', texture)
    // })

    // const loader = new THREE.TextureLoader()

    // const panoMaterial = new THREE.MeshBasicMaterial()
    // panoMaterial.map = //THREE.ImageUtils.loadTexture(require('./equirectangle.jpg'))

    // const panoMesh = new THREE.Mesh(panoGeometry, panoMaterial)
    // panoMesh.material.side = THREE.DoubleSide
    // panoMesh.name = 'pano'
    // this.scene.add(panoMesh)
  }

  createHotspot (type) {
    // TODO Use type to create a specific hotspot material
    return new Mesh(
      new PlaneGeometry(3, 3),
      new MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xff0000,
        shininess: 250,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors
      })
    )
  }

  loadHotspots () {
    var planeCount = 3
    while (planeCount) {
      const plane = this.createHotspot()
      plane.name = `plane-${planeCount}`
      plane.position.set(planeCount * 5, 0, -20)
      plane.lookAt(this.camera.position)

      plane.onFuzing = function () {
        console.warn('fusing')
        if (plane.material.emissive) {
          this.material.emissive.setHex(0xfff000)
        }
      }

      plane.onFuzed = function () {
        console.warn('onfused')
        plane.material.emissive.setHex(0x00ff00)
      }

      plane.onFuzeEnd = function () {
        console.warn('onfuseend')
        if (this.material.emissive) {
          this.material.emissive.setHex(0xff0000)
        }
      }

      this.cursor.addItem(plane)
      this.scene.add(plane)
      planeCount--
    }
  }

  addHotspot () {
    const hotspot = this.createHotspot()
    hotspot.name = ''
    // hotspot.position.set()
    // this.scene.add(hotspot)
  }

  removeHotspot (name) {
    const selectedObject = this.cene.getObjectByName(name)
    this.scene.remove(selectedObject)
    // renderLoop()
  }

  update = (dT) => {
    console.log(this.cursor.update())
  }

  render () {
    const {ThreeView} = this

    return (
      <ThreeView
        style={{flex: 1}}
        backgroundColor={'#FFFFFF'}
        scene={this.scene}
        camera={this.camera}
        tick={this.update}
      />
    )
  }
}

// Map of asset names to modules. List your assets here.
const modules = {
  'pano': require('./equirectangle.jpg')
}

// Export map of asset names to `Expo.Asset` objects.
const Assets = Object.assign({},
  ...Object.keys(modules).map(name => ({
    [name]: Expo.Asset.fromModule(modules[name])
  }))
)

const loadImageMaterial = (assetName, threeView) => {
  const texture = threeView.textureFromAsset(Assets[assetName])
  texture.minFilter = texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true // Use the image's alpha channel for alpha.
  })

  return material
}
