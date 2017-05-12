import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_FLOORPLAN,
  DELETE_FLOORPLAN,
  UPDATE_FLOORPLAN
} from '../constants/actionTypes'
import listUtils from '../services/listUtils'

// Array of Floorplan ()
const initialState = []

export default function floorplan (state = initialState, action) {
  switch (action.type) {
    case ADD_FLOORPLAN:
      return addFloorPlan(state, action.payload)
    case DELETE_FLOORPLAN:
      return deleteFloorPlan(state, action.payload)
    case UPDATE_FLOORPLAN:
      return updateFloorplan(state, action.payload)
    default:
      return state
  }
}

function addFloorPlan (state, floorplan) {
  const floorplans = cloneDeep(state)
  floorplans.push(floorplan)
  return floorplans
}

function deleteFloorPlan (state, id) {
  const floorplans = cloneDeep(state)
  return floorplans.filter(floorplan => floorplan.id !== id)
}

function updateFloorplan (state, payload) {
  const {floorplanId, updates} = payload
  const floorplans = cloneDeep(state)
  const floorplan = floorplans.find(floorplan => floorplan.id === floorplanId)

  if (floorplan && updates) {
    Object.keys(updates).forEach((key) => {
      if (key === 'rooms') {
        floorplan[key] = listUtils.update(floorplan[key], updates[key])
      } else {
        floorplan[key] = updates[key]
      }
    })
  }

  return floorplans
}
