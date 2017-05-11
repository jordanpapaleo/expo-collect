import React from 'react'
import Main from './src/components/Main'
import {configureStore} from './src/store'
import {Provider} from 'react-redux'

let initialState = {
  app: {
    activeCaptureId: null,
    activeHotspotId: null,
    activeFloorPlanId: null,
    activeRoomId: null,
    settings: {
      invertControls: true,
      autoSave: true
    }
  }
}

const store = configureStore(initialState)
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
