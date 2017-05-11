import {getCameraInfo} from '../services/camera'

export function checkSession () {
  return dispatch => {
    getCameraInfo().then(
      (data) => {
        console.log('checkSession', data)
        dispatch({
          type: 'SESSION',
          payload: data.sessionId
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
