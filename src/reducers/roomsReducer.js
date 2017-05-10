import {
  ADD_BLUR,
  CAPTURE_NAME,
  CAPTURE_NOTE,
  CAPTURE,
  DELETE_ROOM,
  DELETE_SCREENSHOT,
  EDIT_BLUR,
  HOTSPOT,
  DELETE_CAPTURE,
  ROOM,
  SCREENSHOT,
  SET_ROOMS,
  UPDATE_ROOM
} from '../constants/actionTypes'
import cloneDeep from 'lodash/cloneDeep'

const initialState = []

export default function room (state = initialState, action) {
  switch (action.type) {
    case CAPTURE:
      return addCapture(state, action.payload)
    case DELETE_SCREENSHOT:
      return deleteScreenshot(state, action.payload)
    case HOTSPOT:
      return addHotspot(state, action.payload)
    case ADD_BLUR:
      return addBlur(state, action.payload)
    case EDIT_BLUR:
      return editBlur(state, action.payload)
    case DELETE_CAPTURE:
      return deleteCapture(state, action.payload)
    case ROOM:
      return addRoom(state, action.payload)
    case SCREENSHOT:
      return saveScreenshot(state, action.payload)
    case DELETE_ROOM:
      return deleteRoom(state, action.payload)
    case UPDATE_ROOM:
      return updateRoom(state, action.payload)
    case CAPTURE_NOTE:
      return updateCaptureNote(state, action.payload)
    case CAPTURE_NAME:
      return updateCaptureName(state, action.payload)
    case SET_ROOMS:
      // Replaces the rooms with new ones
      return action.payload
    default:
      return state
  }
}

function addBlur (state, payload) {
  const {captureId, blur} = payload
  const rooms = cloneDeep(state)
  const capture = getCaptureById(captureId, rooms)

  capture.blurs = capture.blurs || []
  capture.blurs.push(blur)

  return rooms
}

function editBlur (state, payload) {
  const {captureId, blurId, updates} = payload
  const rooms = cloneDeep(state)
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

function deleteScreenshot (state, payload) {
  const {roomId, screenshot: {id: screenshotId}} = payload
  const rooms = cloneDeep(state)
  const room = rooms.find(room => room.id === roomId)

  if (room && room.screenshots) {
    room.screenshots = room.screenshots.filter(screenshot => screenshot.id !== screenshotId)
  }

  return rooms
}

function deleteCapture (state, payload) {
  const {roomId, captureId} = payload
  const rooms = cloneDeep(state)
  const room = rooms.find(room => room.id === roomId)

  if (room && room.captures) {
    room.captures = room.captures.filter(capture => capture.id !== captureId)
  }

  return rooms
}

function addCapture (state, payload) {
  const rooms = cloneDeep(state)
  const {capture: nextCapture, roomId} = payload
  const room = rooms.find(room => room.id === roomId)
  room.captures.push(nextCapture)
  return rooms
}

function saveScreenshot (state, payload) {
  const rooms = cloneDeep(state)
  const room = rooms.find(room => room.id === payload.roomId)
  room.screenshots = room.screenshots || []
  room.screenshots.push(payload.screenshot)
  return rooms
}

function addRoom (state, room) {
  const rooms = cloneDeep(state)
  rooms.push(room)
  return rooms
}

function updateRoom (state, roomUpdate) {
  const rooms = cloneDeep(state)
  const i = rooms.findIndex(room => room.id === roomUpdate.id)
  rooms[i] = roomUpdate
  return rooms
}

function deleteRoom (state, id) {
  const rooms = cloneDeep(state)
  return rooms.filter(room => room.id !== id)
}

function updateCaptureNote (state, payload) {
  const rooms = cloneDeep(state)
  const capture = getCaptureById(payload.captureId, rooms)

  capture.note = {
    html: payload.noteHTML,
    markdown: payload.noteMarkdown
  }

  return rooms
}

function updateCaptureName (state, payload) {
  const rooms = cloneDeep(state)
  const capture = getCaptureById(payload.captureId, rooms)
  capture.name = payload.name
  return rooms
}

function getCaptureById (captureId, rooms) {
  return rooms.find(room => room.captures.some(capture => capture.id === captureId))
}
