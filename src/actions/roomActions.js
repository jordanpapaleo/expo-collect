import {
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM
} from '../constants/actionTypes'
import Room from '../models/Room'

export function addRoom () {
  const room = new Room()
  return {
    type: ADD_ROOM,
    payload: {room}
  }
}

export function deleteRoom (id, roomId) {
  return {
    type: DELETE_ROOM,
    payload: {roomId}
  }
}

export function updateRoom (roomId, updates) {
  return {
    type: UPDATE_ROOM,
    payload: {roomId, updates}
  }
}
