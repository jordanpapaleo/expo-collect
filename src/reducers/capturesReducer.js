import cloneDeep from 'lodash/cloneDeep'
import {
  CAPTURE_NAME,
  CAPTURE_NOTE,
  CAPTURE,
  DELETE_CAPTURE
} from '../constants/actionTypes'

const initialState = []

export default function captures (state = initialState, action) {
  switch (action.type) {
    case CAPTURE:
      return addCapture(state, action.payload)
    case DELETE_CAPTURE:
      return deleteCapture(state, action.payload)
    case CAPTURE_NOTE:
      return updateCaptureNote(state, action.payload)
    case CAPTURE_NAME:
      return updateCaptureName(state, action.payload)
    default:
      return state
  }
}

function addCapture (state, payload) {
  const captures = cloneDeep(state)
  captures.push(payload)
  return captures
}

function updateCaptureNote (state, payload) {
  const captures = cloneDeep(state)
  const capture = captures.find(capture => capture.id === payload.captureId)

  if (capture) {
    capture.note = {
      html: payload.noteHTML,
      markdown: payload.noteMarkdown
    }
  }

  return captures
}

function updateCaptureName (state, payload) {
  const captures = cloneDeep(state)
  const capture = captures.find(capture => capture.id === payload.captureId)

  if (capture) {
    capture.name = payload.name
  }

  return captures
}

function deleteCapture (state, payload) {
  const captures = cloneDeep(state)
  return captures.filter(capture => capture.id !== payload.captureId)
}
