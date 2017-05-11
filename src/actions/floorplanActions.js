import {ADD_FLOORPLAN, DELETE_FLOORPLAN, SET_FLOORPLANS} from '../constants/actionTypes'
import {setActiveFloorPlan, saveState} from './appActions'

export function newFloorPlan () {
  const id = Date.now()
  const floorplan = {
    name: `FP-Name-${id}`,
    id: `floorplan-${id}`,
    rooms: []
  }

  return [
    {
      type: ADD_FLOORPLAN,
      payload: floorplan
    },
    setActiveFloorPlan(floorplan.id),
    saveState()
  ]
}

export function deleteFloorPlan (id) {
  return [
    {
      type: DELETE_FLOORPLAN,
      payload: id
    },
    setActiveFloorPlan(null),
    saveState()
  ]
}

// keys: ADDROOM, DELETEROOM, UPDATEROOM
export function updateFloorPlan (id, updates) {
  console.log('updates', updates)
  return dispatch => {
    // Allows for multiple updates to be put in a single object
    Object.keys(updates).forEach((key) => {
      dispatch({
        type: `UPDATE_FLOORPLAN_${key}`,
        payload: {id, value: updates[key]}
      })
    })
  }
}

// Used to completely replace the floorplans in redux
export function setFloorPlans (floorplans) {
  return {
    type: SET_FLOORPLANS,
    payload: floorplans
  }
}
