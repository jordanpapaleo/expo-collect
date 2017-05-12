import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_BLUR,
  DELETE_HOTSPOT,
  EDIT_BLUR,
  HOTSPOT
} from '../constants/actionTypes'

const initialState = {
  blurs: [],
  info: [],
  move: []
}

export default function hotspots (state = initialState, action) {
  switch (action.type) {
    case HOTSPOT:
      return addHotspot(state, action.payload)
    case ADD_BLUR:
      return addBlur(state, action.payload)
    case EDIT_BLUR:
      return editBlur(state, action.payload)
    case DELETE_HOTSPOT:
      return deleteHotspot(state, action.payload)
    default:
      return state
  }
}

function addBlur (state, payload) {
  const rooms = cloneDeep(state)
  const {captureId, blur} = payload
  const capture = getCaptureById(captureId, rooms)

  capture.blurs = capture.blurs || []
  capture.blurs.push(blur)

  return rooms
}

function editBlur (state, payload) {
  const rooms = cloneDeep(state)
  const {captureId, blurId, updates} = payload
  const capture = getCaptureById(captureId, rooms)
  const blur = capture.blurs.find(blur => blur.id === blurId)

  Object.keys(updates).forEach((key) => {
    blur[key] = updates[key]
  })

  return rooms
}

function addHotspot (state, payload) {
  const rooms = cloneDeep(state)
  const capture = getCaptureById(payload.captureId, rooms)

  capture.hotspots = capture.hotspots || []
  capture.hotspots.push(payload.hotspot)

  return rooms
}

function deleteHotspot (state, payload) {
  // TODO
}

function getCaptureById (captureId, rooms) {
  return rooms.find(room => room.captures.some(capture => capture.id === captureId))
}
