import React from 'react'
import Main from './src/components/Main'
import {configureStore} from './src/store'
import {Provider} from 'react-redux'
import sampleData from './sampleData'
import Floorplan from './src/models/Floorplan'
import Capture from './src/models/Capture'
import Room from './src/models/Room'
import Hotspot from './src/models/Hotspot'
import Screenshot from './src/models/Screenshot'

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
  floorplans: sampleData.floorplans.map(floorplan => new Floorplan(floorplan)),
  rooms: sampleData.rooms.map(room => new Room(room)),
  captures: sampleData.captures.map(capture => new Capture(capture)),
  hotspots: sampleData.hotspots.map(hotspot => new Hotspot(hotspot)),
  screenshots: sampleData.screenshots.map(screenshot => new Screenshot(screenshot))
}
// console.log(JSON.stringify(initialState, null, 2))

const store = configureStore(initialState)
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
