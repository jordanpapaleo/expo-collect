import {NOTIFICATION, CLEAR_NOTIFICATIONS, DISMISS_NOTIFICATION, UPDATE_NOTIFICATION} from '../constants/actionTypes'
import {cloneDeep} from 'lodash'

const initialState = []

export default function notifications (state = initialState, action) {
  const notifications = cloneDeep(state)

  switch (action.type) {
    case NOTIFICATION:
      return [
        ...state,
        {
          type: action.payload.type,
          title: action.payload.title,
          message: action.payload.message,
          id: action.payload.id
        }
      ]
    case DISMISS_NOTIFICATION:
      for (let i = 0, j = notifications.length; i < j; i++) {
        if (notifications[i].id === action.payload.id) {
          notifications.splice(i, 1)
          break
        }
      }
      return [...notifications]
    case CLEAR_NOTIFICATIONS:
      return []
    case UPDATE_NOTIFICATION:
      for (let i = 0, j = notifications.length; i < j; i++) {
        if (notifications[i].id === action.payload.id) {
          notifications.splice(i, 1, action.payload)
          break
        }
      }
      return [...notifications]
    default:
      return state
  }
}
