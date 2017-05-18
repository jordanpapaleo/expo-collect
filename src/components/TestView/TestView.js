import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import Expo from 'expo'
import * as THREE from 'three'

const {width, height} = Dimensions.get('window')
const THREEView = Expo.createTHREEViewClass(THREE)

export default class TestView extends Component {
  render () {
    const fov = 75
    const aspect = width / height
    const near = 0.1
    const far = 10000

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
    const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})

    const cube = new THREE.Mesh(boxGeometry, boxMaterial)
    cube.position.z = -50
    scene.add(cube)

    return (
      <THREEView
        style={{flex: 1}}
        backgroundColor={'#0000FF'}
        scene={scene}
        camera={camera}
        tick={dt => { console.log('dt', dt) }}
      />
    )
  }
}
