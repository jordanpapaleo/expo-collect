import {getCameraInfo} from '../services/camera'
import {setSpinner} from './appActions'
import {addNotification, updateNotification} from './notificationActions'
import {
  CAMERA_INFO,
  SESSION
} from '../constants/actionTypes'

export function checkSession () {
  return dispatch => {
    const notification = {
      type: 'info',
      title: 'Camera Status',
      message: 'Checking connection to camera...'
    }

    dispatch(addNotification(notification))

    getCameraInfo().then(
      (data) => {
        console.log('checkSession', data)
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
  return dispatch => {
    dispatch(setSpinner(true))
  }
}
