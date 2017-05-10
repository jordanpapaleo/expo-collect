import {
  ACTIVE_CAPTURE,
  ACTIVE_FLOORPLAN,
  ACTIVE_HOTSPOT,
  ACTIVE_ROOM,
  AUTO_SAVE,
  CAMERA_INFO,
  CLEAR_MODAL,
  INVERT_CONTROLS,
  LOADING,
  MODAL,
  ROTATION,
  SESSION
} from '../constants/actionTypes'
import cloneDeep from 'lodash/cloneDeep'

const initialState = {
  activeCaptureId: null,
  activeHotspotId: null,
  activeFloorPlanId: null,
  activeRoomId: null,
  cameraInfo: {},
  sessionId: null,
  settings: {
    invertControls: false
  },
  loading: false
}

export default function app (state = initialState, action) {
  console.debug(action.type)
  const stateClone = cloneDeep(state)

  switch (action.type) {
    case 'RESET_APP':
      return {
        ...initialState,
        settings: {
          ...cloneDeep(state).settings
        }
      }
    case LOADING:
      return {
        ...cloneDeep(state),
        loading: action.payload
      }
    case ACTIVE_FLOORPLAN:
      return {
        ...cloneDeep(state),
        activeFloorPlanId: action.payload
      }
    case ACTIVE_CAPTURE:
      return {
        ...cloneDeep(state),
        activeCaptureId: action.payload
      }
    case ACTIVE_HOTSPOT:
      return {
        ...cloneDeep(state),
        activeHotspotId: action.payload
      }
    case ACTIVE_ROOM:
      return {
        ...cloneDeep(state),
        activeRoomId: action.payload
      }
    case ROTATION:
      return {
        ...cloneDeep(state),
        cameraRotation: action.payload
      }
    case CAMERA_INFO:
      return {
        ...stateClone,
        cameraInfo: action.payload
      }
    case CLEAR_MODAL:
      return {
        ...stateClone,
        modal: action.payload
      }
    case INVERT_CONTROLS:
      return {
        ...stateClone,
        settings: {
          ...cloneDeep(stateClone.settings),
          invertControls: action.payload
        }
      }
    case AUTO_SAVE:
      return {
        ...stateClone,
        settings: {
          ...cloneDeep(stateClone.settings),
          autoSave: action.payload
        }
      }
    case MODAL:
      return {
        ...stateClone,
        modal: {
          ...stateClone.modal,
          ...action.payload
        }
      }
    case SESSION:
      return {
        ...cloneDeep(state),
        sessionId: action.payload
      }
    default:
      return state
  }
}
