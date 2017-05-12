import React from 'react'
import Main from './src/components/Main'
import {configureStore} from './src/store'
import {Provider} from 'react-redux'

const sampleProperty = {
  id: 'property-1493925806888',
  floorplans: [
    {
      name: 'FP-Name-1493925806940',
      id: 'floorplan-1493925806940',
      rooms: [
        'room-1493925821533',
        'room-1493925891930'
      ]
    }
  ],
  rooms: [
    {
      id: 'room-1493925821533',
      name: 'Front Door',
      captures: [
        'SID_0002-Front Door-capture-1'
      ],
      position: {
        x: 0.6382211538461539,
        y: 0.7073578595317725,
        w: 0.19951923076923078,
        h: 0.10033444816053512
      }
    },
    {
      id: 'room-1493925891930',
      name: 'living room',
      captures: [
        'SID_0001-living room-capture-1',
        'SID_0001-living room-capture-2'
      ],
      position: {
        x: 0.8389423076923077,
        y: 0.3377926421404682,
        w: 0.19951923076923078,
        h: 0.3595317725752508
      }
    }
  ],
  captures: [
    {
      name: 'Front Door-capture-1',
      position: {
        x: 0.5,
        y: 0.6607142857142857
      },
      id: 'SID_0002-Front Door-capture-1',
      note: {
        html: '<p><br></p>',
        markdown: '​\n'
      },
      date: '2017:05:04 12:23:01-07:00',
      uri: '100ricoh-r0010284.jpg',
      hotspots: [
        'hotspot-move-1493927738057'
      ]
    },
    {
      name: 'living room-capture-1',
      position: {
        x: 0.08641975308641975,
        y: 0.919431279620853
      },
      id: 'SID_0001-living room-capture-1',
      note: {
        html: '<p><br></p>',
        markdown: '​\n'
      },
      date: '2017:05:04 12:44:48-07:00',
      uri: '100ricoh-r0010294.jpg',
      hotspots: [
        'blur-1493927697905'
      ]
    },
    {
      name: 'living room-capture-2',
      position: {
        x: 0.47530864197530864,
        y: 0.47393364928909953
      },
      id: 'SID_0001-living room-capture-2',
      note: {
        html: '<p><br></p>',
        markdown: '​\n'
      },
      date: '2017:05:04 12:47:59-07:00',
      uri: '100ricoh-r0010299.jpg',
      hotspots: [
        'hotspot-info-1493927661764',
        'hotspot-move-1493927713666'
      ]
    }
  ],
  hotspots: [
    {
      id: 'hotspot-info-1493927661764',
      type: 'info',
      position: '27.02404483209286 -5.056321881160432 11.719917223106918',
      rotation: '-10.084057194302492 -113.44564343590304 0',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      width: 3,
      height: 3,
      meta: {
        description: 'thermador range'
      }
    },
    {
      id: 'hotspot-move-1493927713666',
      type: 'move',
      position: '29.725945992060474 -1.4898066056475074 1.6426501564409692',
      rotation: '-2.8647889756541147 -93.16293748827192 0',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      width: 3,
      height: 3,
      meta: {
        roomid: 'room-1493926045016',
        captureId: 'SID_0001-temp hall-capture-1'
      }
    },
    {
      id: 'blur-1493927697905',
      type: 'blur',
      position: '31.52415855652295 0.9275856802407966 -14.377295165340369',
      rotation: '-6.990085100596044 -82.50592249883854 0',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      width: 3,
      height: 3,
      meta: {}
    },
    {
      id: 'hotspot-move-1493927738057',
      type: 'move',
      position: '29.673708223036243 -3.3377128691522855 0.39182530052680564',
      rotation: '-6.531718864491381 -90.75651474872237 0',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      width: 3,
      height: 3,
      meta: {
        roomid: 'room-1493925992195',
        captureId: 'SID_0001-kitchen-capture-1'
      }
    }
  ]
}

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
  floorplans: sampleProperty.floorplans,
  rooms: sampleProperty.rooms,
  captures: sampleProperty.captures,
  // hotpsots: sampleProperty.hostspots
}

console.log('initialState', initialState)

const store = configureStore(initialState)
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
