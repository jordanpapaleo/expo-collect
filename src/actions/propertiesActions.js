import {api} from '../services/api'
import {
  CLOUD_PROPERTIES,
  DELETE_LOCAL_PROPERTY,
  LOCAL_PROPERTIES,
  NEW_LOCAL_PROPERTY
} from '../constants/actionTypes'
import {setSpinner} from './appActions'

export function getLocalProperties () {
  return (dispatch) => {
    dispatch(setSpinner(true))

    api.get('properties').then(
      (data) => {
        dispatch({
          type: LOCAL_PROPERTIES,
          payload: data
        })

        dispatch(setSpinner(false))
      },
      (err) => {
        console.error(err)
        setSpinner(false)
      }
    )
  }
}

export function newLocalProperty (propertyId) {
  return {
    type: NEW_LOCAL_PROPERTY,
    payload: propertyId
  }
}

export function deleteLocalProperty (propertyId) {
  return {
    type: DELETE_LOCAL_PROPERTY,
    payload: propertyId
  }
}

export function getCloudProperties () {
  return (dispatch) => {
    dispatch(setSpinner(true))

    api.get('cloud').then(
      (data) => {
        dispatch({
          type: CLOUD_PROPERTIES,
          payload: data
        })

        dispatch(setSpinner(false))
      },
      (err) => {
        console.error(err)
        dispatch(setSpinner(false))
      }
    )
  }
}
