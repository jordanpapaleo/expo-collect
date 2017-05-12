import {
  ADD_HOTSPOT,
  DELETE_HOTSPOT,
  UPDATE_HOTSPOT
} from '../constants/actionTypes'
import Hotspot from '../models/Hotspot'

export function newHotspot () {
  const hotspot = new Hotspot()

  return {
    type: ADD_HOTSPOT,
    payload: {hotspot}
  }
}

export function updateHotspot (hotspotId, updates) {
  return {
    type: UPDATE_HOTSPOT,
    payload: {hotspotId, updates}
  }
}

export function deleteHotspot (hotspotId) {
  return {
    type: DELETE_HOTSPOT,
    payload: {hotspotId}
  }
}
