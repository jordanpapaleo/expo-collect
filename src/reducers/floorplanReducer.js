import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_FLOORPLAN,
  DELETE_FLOORPLAN,
  SET_FLOORPLANS,
  UPDATE_FLOORPLAN_ADDROOM,
  UPDATE_FLOORPLAN_DELETEROOM,
  UPDATE_FLOORPLAN_UPDATEROOM
} from '../constants/actionTypes'

const initialState = []

export default function floorplan (state = initialState, action) {
  switch (action.type) {
    case ADD_FLOORPLAN:
      return newFloorPlan(state, action.payload)
    case DELETE_FLOORPLAN:
      return deleteFloorPlan(state, action.payload)
    case UPDATE_FLOORPLAN_ADDROOM:
      return addRoom(state, action.payload)
    case UPDATE_FLOORPLAN_DELETEROOM:
      return deleteRoom(state, action.payload)
    case UPDATE_FLOORPLAN_UPDATEROOM:
      return updateRoom(state, action.payload)
    case SET_FLOORPLANS:
      return action.payload
    default:
      return state
  }
}

function newFloorPlan (state, floorplan) {
  const floorplans = cloneDeep(state)
  floorplans.push(floorplan)
  return floorplans
}

function addRoom (state, payload) {
  const floorplans = cloneDeep(state)
  const {id: floorplanId, value: roomId} = payload
  const floorplan = floorplans.find(floorplan => floorplan.id === floorplanId)

  if (floorplan) {
    floorplan.rooms.push(roomId)
  }

  return floorplans
}

function deleteRoom (state, payload) {
  const floorplans = cloneDeep(state)
  const {id: floorplanId, value: roomId} = payload
  const floorplan = floorplans.find(floorplan => floorplan.id === floorplanId)

  if (floorplan) {
    floorplan.rooms = floorplan.rooms.filter(id => id !== roomId)
  }

  return floorplans
}

function updateRoom (state, payload) {
  return cloneDeep(state)
}

function deleteFloorPlan (state, id) {
  const floorplans = cloneDeep(state)
  return floorplans.filter(floorplan => floorplan.id !== id)
}
