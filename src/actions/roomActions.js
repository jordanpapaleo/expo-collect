import {api} from '../services/api'
import {updateFloorPlan} from './floorplanActions'
import {addNotification} from './notificationActions'
import {
  clearModalData,
  saveState,
  setActiveRoomCapture,
  setModalData,
  setSpinner
} from './appActions'
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
  SESSION,
  SET_ROOMS,
  UPDATE_ROOM
} from '../constants/actionTypes'

export function addCapture (roomId, name, position) {
  return (dispatch, getState) => {
    const state = getState()
    const {sessionId} = state.app
    const {id: propertyId} = state
    const passThrough = {name, position, roomId}
    const data = {sessionId, propertyId}
    const tempId = 'temp'

    dispatch(setSpinner(true))

    dispatch(setModalData('editCaptureNote', {
      captureNote: {
        captureId: tempId,
        captureName: name,
        roomId,
        propertyId
      }
    }))

    api.post(`camera/capture`, data, passThrough)
      .then((data) => {
        // Updates session
        dispatch({
          type: SESSION,
          payload: data.sessionId
        })

        const capture = {
          name: data.name,
          position: data.position,
          date: data.date,
          uri: data.uri,
          hotspots: data.hotspots,
          id: `${data.sessionId}-${data.name}`
        }

        // Replaces temp capture with real data
        dispatch({
          type: CAPTURE,
          payload: {
            capture,
            roomId: data.roomId
          }
        })

        // update room and capture ids in modal component
        dispatch(setModalData(null, {
          roomId: data.roomId,
          captureId: capture.id
        }))

        dispatch([
          setActiveRoomCapture(data.roomId, capture.id),
          saveState(),
          setSpinner(false)
        ])
      })
      .catch((err) => {
        dispatch([
          deleteCapture(roomId, tempId),
          setSpinner(false),
          clearModalData()
        ])

        if (err.data.name === 'FetchError' && err.data.type === 'request-timeout') {
          dispatch(addNotification({
            type: 'error',
            title: 'Capture Failed',
            message: 'Not connected to camera.',
            error: err.data
          }))
        }
      })
  }
}

export function updateCaptureNote (roomId, captureId, note) {
  return [
    {
      type: CAPTURE_NOTE,
      payload: {
        roomId,
        captureId,
        noteHTML: note.toString('html'),
        noteMarkdown: note.toString('markdown')
      }
    },
    saveState()
  ]
}

export function updateCaptureName (roomId, captureId, name) {
  return [
    {
      type: CAPTURE_NAME,
      payload: {roomId, captureId, name}
    },
    saveState()
  ]
}

export function deleteCapture (roomId, capture) {
  return (dispatch, getState) => {
    const state = getState()
    const {id} = state
    const fileName = capture.uri // TODO update this in the data to be filename

    api.delete(`captures/${id}/${fileName}`).then(
      (data) => {
        dispatch([
          {
            type: DELETE_CAPTURE,
            payload: {roomId, captureId: capture.id}
          },
          saveState()
        ])
      },
      (err) => {
        console.log(err)
        dispatch(saveState())
      }
    )
  }
}

export function addHotspot (roomId, captureId, hotspot) {
  return [
    {
      type: HOTSPOT,
      payload: {roomId, captureId, hotspot}
    },
    saveState()
  ]
}

export function addBlur (roomId, captureId, blur) {
  return [
    {
      type: ADD_BLUR,
      payload: {roomId, captureId, blur}
    },
    saveState()
  ]
}

export function editBlur (roomId, captureId, blurId, updates) {
  return [
    {
      type: EDIT_BLUR,
      payload: {roomId, captureId, blurId, updates}
    },
    saveState()
  ]
}

export function saveScreenshot (roomId, screenshot) {
  return (dispatch, getState) => {
    const state = getState()
    const {id: propertyId} = state

    dispatch(setSpinner(true))

    // screenshot.getCanvas seems to lock the browser while it is processing
    // which causes a signifigant lag in the loading spinner displaying.
    // if we wrap this code in a timeout with 0 as the duration if allows
    // the spinner to display before the getCanvas process locks the browser.
    // this is desirable as the user knows their click did something and they won't
    // click multiple times thinking nothing happened.

    // TODO Use a web worker

    setTimeout(() => {
      const entitiesToHide = document.querySelectorAll('a-cursor, a-circle')

      // hide the cursor and all hotspots
      entitiesToHide.forEach((entity) => {
        entity.setAttribute('visible', false)
      })

      const screenshotCanvas = document.querySelector('a-scene').components.screenshot.getCanvas('perspective')
      const uri = screenshotCanvas.toDataURL('png')

      // show the cursor and all hotspots again
      entitiesToHide.forEach((entity) => {
        entity.setAttribute('visible', true)
      })

      screenshot.note = {
        html: screenshot.note.toString('html'),
        markdown: screenshot.note.toString('markdown')
      }

      const postData = {
        uri,
        id: screenshot.id
      }

      api.post(`screenshots/${propertyId}`, postData)
        .then((data) => {
          dispatch([
            {
              type: SCREENSHOT,
              payload: {
                roomId,
                screenshot: {
                  ...screenshot,
                  fileName: `${data.fileName}`
                }
              }
            },
            setSpinner(false),
            saveState()
          ])
        })
        .catch((err) => {
          console.error(err)
          dispatch(setSpinner(false))
        })
    }, 0)
  }
}

export function deleteScreenshot (roomId, screenshot) {
  return (dispatch, getState) => {
    const state = getState()
    const {id} = state

    dispatch(setSpinner(true))

    api.delete(`screenshots/${id}/${screenshot.fileName}`)
      .then(() => {
        dispatch([
          {
            type: DELETE_SCREENSHOT,
            payload: {
              roomId,
              screenshot
            }
          },
          setSpinner(false),
          saveState()
        ])
      })
      .catch((err) => {
        console.error(err)
        dispatch(setSpinner(false))
      })
  }
}

export function addRoom (room, floorPlanId) {
  return [
    {
      type: ROOM,
      payload: room
    },
    updateFloorPlan(floorPlanId, {ADDROOM: room.id}),
    saveState()
  ]
}

export function deleteRoom (id, floorPlanId) {
  return [
    {
      type: DELETE_ROOM,
      payload: id
    },
    updateFloorPlan(floorPlanId, {DELETEROOM: id}),
    saveState()
  ]
}

export function updateRoom (room) {
  return [
    {
      type: UPDATE_ROOM,
      payload: room
    },
    saveState()
  ]
}

export function setRooms (rooms) {
  return {
    type: SET_ROOMS,
    payload: rooms
  }
}
