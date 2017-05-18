import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import Expo from 'expo'
import * as THREE from 'three'

const {width, height} = Dimensions.get('window')
const THREEView = Expo.createTHREEViewClass(THREE)

export default class TestThreeJS extends Component {
  componentWillMount () {
    const fov = 75
    const aspect = width / height
    const near = 0.1
    const far = 10000
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
    const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.cube = new THREE.Mesh(boxGeometry, boxMaterial)
    this.cube.position.z = -50
    this.scene.add(this.cube)
  }

  tick = (dT) => {
    this.cube.rotation.x += 1 * dT
    this.cube.rotation.y += 1 * dT
  }

  render () {
    return (
      <THREEView
        style={{flex: 1}}
        backgroundColor={'#0000FF'}
        scene={this.scene}
        camera={this.camera}
        tick={this.tick}
      />
    )
  }
}
