import React from 'react'
import Main from './src/components/Main'
import {configureStore} from './src/store'
import {Provider} from 'react-redux'
import sampleData from './sampleData'

const initialState = {
  app: {
    activeFloorPlanId: null,
    activeRoomId: null,
    activeCaptureId: null,
    activeHotspotId: null,
    settings: {
      invertControls: true,
      autoSave: true
    }
  },
  floorplans: sampleData.floorplans,
  rooms: sampleData.rooms,
  captures: sampleData.captures,
  hotspots: sampleData.hotspots,
  screenshots: sampleData.screenshots
}

console.log('initialState', initialState)

const store = configureStore(initialState)
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
