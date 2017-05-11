import camera from '../services/camera'
import {setSpinner} from './appActions'
import {addNotification, updateNotification} from './notificationActions'
import {
  CAMERA_INFO,
  SESSION
} from '../constants/actionTypes'

export function getCameraInfo () {
  return dispatch => {
    const notification = {
      type: 'info',
      title: 'Camera Status',
      message: 'Checking connection to camera...'
    }

    dispatch(addNotification(notification))

    camera.getInfo().then(
      (data) => {
        dispatch({
          type: CAMERA_INFO,
          payload: data.cameraInfo
        })
        dispatch({
          type: SESSION,
          payload: data.sessionId
        })

        if (data.sessionId && Object.keys(data.cameraInfo).length) {
          notification.message = 'Connected to camera!'
        } else {
          notification.type = 'error'
          notification.message = 'Not connected to camera.'
        }

        dispatch(updateNotification(notification))
      },
      (err) => {
        notification.type = 'error'
        notification.message = 'An error occured while checking the connection status.'
        notification.payload.error = err
        dispatch(updateNotification(notification))
      }
    )
  }
}

export function takePicture () {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(setSpinner(true))

    camera.takePicture(state.camera.sessionId).then(
      (data) => {
        console.log('ACTION: take picture', data)
      },
      (err) => {
        console.error('ACTION:  take picture', err)
      }
    )
  }
}
