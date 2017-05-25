/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from 'three'
import ImageLoader from './ImageLoader'

const {
  RGBAFormat,
  RGBFormat,
  Texture,
  DefaultLoadingManager
} = THREE

export default function TextureLoader (manager) {
  this.manager = (manager !== undefined)
    ? manager
    : DefaultLoadingManager
}

Object.assign(TextureLoader.prototype, {
  load (url, onLoad, onProgress, onError) {
    console.log('load texture', url)
    const imageLoader = new ImageLoader(this.manager)
    imageLoader.setCrossOrigin(this.crossOrigin)
    imageLoader.setPath(this.path)

    const texture = new Texture()
    texture.image = imageLoader.load(url, () => {
      // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
      const isJPEG = url.search(/\.(jpg|jpeg)$/) > 0 || url.search(/^data\:image\/jpeg/) === 0
      texture.needsUpdate = true
      texture.format = isJPEG ? RGBFormat : RGBAFormat

      if (onLoad) {
        onLoad(texture)
      }
    }, onProgress, onError)

    return texture
  },
  setCrossOrigin (value) {
    this.crossOrigin = value
    return this
  },
  setPath (value) {
    this.path = value
    return this
  }
})
