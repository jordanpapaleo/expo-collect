import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_HOTSPOT,
  DELETE_HOTSPOT,
  UPDATE_HOTSPOT
} from '../constants/actionTypes'

// Array of Hotspot ()
const initialState = []

export default function hotspots (state = initialState, action) {
  switch (action.type) {
    case ADD_HOTSPOT:
      return addHotspot(state, action.payload)
    case UPDATE_HOTSPOT:
      return updateHotspot(state, action.payload)
    case DELETE_HOTSPOT:
      return deleteHotspot(state, action.payload)
    default:
      return state
  }
}

function addHotspot (state, payload) {
  const hotspots = cloneDeep(state)
  hotspots.push(payload.hotspot)
  return hotspots
}

function updateHotspot (state, payload) {
  const {hotspotId, updates} = payload
  const hotspots = cloneDeep(state)
  const hotspot = hotspots.find(hotspot => hotspot.id === hotspotId)

  if (hotspot && updates) {
    Object.keys(updates).forEach((key) => {
      hotspot[key] = updates[key]
    })
  }

  return hotspots
}

function deleteHotspot (state, payload) {
  const hotspots = cloneDeep(state)
  return hotspots.filter(hotspot => hotspot.id !== payload.hotspotId)
}
