import {
  ADD_CAPTURE,
  DELETE_CAPTURE,
  UPDATE_CAPTURE
} from '../constants/actionTypes'
import Capture from '../models/Capture'

export function newCapture () {
  const capture = new Capture()

  return {
    type: ADD_CAPTURE,
    payload: {capture}
  }
}

export function updateCapture (captureId, updates) {
  return {
    type: UPDATE_CAPTURE,
    payload: {captureId, updates}
  }
}

export function deleteCapture (captureId) {
  return {
    type: DELETE_CAPTURE,
    payload: {captureId}
  }
}
