import React from 'react'
import Main from './src/Main'
import {configureStore} from './src/store'
import {Provider} from 'react-redux'

let initialState = {
  properties: {
    local: [],
    cloud: [],
    loading: []
  },
  app: {
    activeCaptureId: null,
    activeHotspotId: null,
    activeFloorPlanId: null,
    activeRoomId: null,
    modal: {},
    sessionId: null,
    settings: {
      invertControls: true,
      autoSave: true
    }
  }
}

const store = configureStore(initialState)
store.dispatch({
  type: 'TEST',
  payload: true
})

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
