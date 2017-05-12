import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT
} from '../constants/actionTypes'

const initialState = []

export default function screenshots (state = initialState, action) {
  switch (action.type) {
    case ADD_SCREENSHOT:
      return addScreenShot(state, action.payload)
    case DELETE_SCREENSHOT:
      return deleteScreenshot(state, action.payload)
    default:
      return state
  }
}

function addScreenShot (state, payload) {
  const screenshots = cloneDeep(state)
  screenshots.push(payload.screenshot)
  // const room = rooms.find(room => room.id === payload.roomId)
  // room.screenshots = room.screenshots || []
  // room.screenshots.push(payload.screenshot)
  return rooms
}

function deleteScreenshot (state, payload) {
  const screenshots = cloneDeep(state)
  const {roomId, screenshot: {id: screenshotId}} = payload
  const room = rooms.find(room => room.id === roomId)

  if (room && room.screenshots) {
    room.screenshots = room.screenshots.filter(screenshot => screenshot.id !== screenshotId)
  }

  return rooms
}
