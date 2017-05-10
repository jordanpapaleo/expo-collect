import {combineReducers} from 'redux'
import app from './appReducer'
import floorplans from './floorplanReducer'
import notifications from './notificationsReducer'
import rooms from './roomsReducer'
import properties from './propertiesReducer'

const id = (state = '', action) => (action.type === 'PROPERTY_ID') ? action.payload : state
const route = (state = { hash: '', timestamp: null }, action) => (action.type === 'ROUTE') ? action.payload : state

export default combineReducers({
  app,
  floorplans,
  id,
  notifications,
  properties,
  rooms,
  route
})
