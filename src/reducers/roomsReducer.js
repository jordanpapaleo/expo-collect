import cloneDeep from 'lodash/cloneDeep'
import {
  DELETE_ROOM,
  ROOM,
  SET_ROOMS,
  UPDATE_ROOM
} from '../constants/actionTypes'

const initialState = []

export default function room (state = initialState, action) {
  switch (action.type) {
    case ROOM:
      return addRoom(state, action.payload)
    case DELETE_ROOM:
      return deleteRoom(state, action.payload)
    case UPDATE_ROOM:
      return updateRoom(state, action.payload)
    case SET_ROOMS:
      // Replaces the rooms with new ones
      return action.payload
    default:
      return state
  }
}

function addRoom (state, room) {
  const rooms = cloneDeep(state)
  rooms.push(room)
  return rooms
}

function updateRoom (state, roomUpdate) {
  const rooms = cloneDeep(state)
  const i = rooms.findIndex(room => room.id === roomUpdate.id)
  rooms[i] = roomUpdate
  return rooms
}

function deleteRoom (state, id) {
  const rooms = cloneDeep(state)
  return rooms.filter(room => room.id !== id)
}
