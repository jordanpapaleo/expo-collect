/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from 'three'

const {DefaultLoadingManager} = THREE
// import {Cache} from './Cache'
// import {DefaultLoadingManager} from './LoadingManager'

export default function ImageLoader (manager = DefaultLoadingManager) {
  this.manager = manager
}

Object.assign(ImageLoader.prototype, {
  load (url = '', onLoad, onProgress, onError) {
    if (this.path) {
      url = this.path + url
    }

    // const image = new Image()
    // const image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img')

    image.addEventListener('load', () => {
      if (onLoad) {
        onLoad(this)
      }

      this.manager.itemEnd(url)
    }, false)

    image.addEventListener('error', (ev) => {
      if (onError) {
        onError(ev)
      }

      this.manager.itemEnd(url)
      this.manager.itemError(url)
    }, false)

    if (url.substr(0, 5) !== 'data:') {
      if (this.crossOrigin !== undefined) {
        image.crossOrigin = this.crossOrigin
      }
    }

    this.manager.itemStart(url)

    image.src = url

    return image
  },
  setCrossOrigin (value) {
    this.crossOrigin = value
    return this
  },
  setPath (value) {
    console.log('Set path', value)
    this.path = value
    return this
  }
})
//
