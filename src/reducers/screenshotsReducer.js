import cloneDeep from 'lodash/cloneDeep'
import {
  DELETE_SCREENSHOT,
  SCREENSHOT
} from '../constants/actionTypes'

const initialState = []

export default function screenshots (state = initialState, action) {
  switch (action.type) {
    case SCREENSHOT:
      return saveScreenshot(state, action.payload)
    case DELETE_SCREENSHOT:
      return deleteScreenshot(state, action.payload)
    default:
      return state
  }
}

function saveScreenshot (state, payload) {
  const rooms = cloneDeep(state)
  const room = rooms.find(room => room.id === payload.roomId)
  room.screenshots = room.screenshots || []
  room.screenshots.push(payload.screenshot)
  return rooms
}

function deleteScreenshot (state, payload) {
  const rooms = cloneDeep(state)
  const {roomId, screenshot: {id: screenshotId}} = payload
  const room = rooms.find(room => room.id === roomId)

  if (room && room.screenshots) {
    room.screenshots = room.screenshots.filter(screenshot => screenshot.id !== screenshotId)
  }

  return rooms
}
