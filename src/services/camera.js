import Api from './Api'

const cameraUrl = 'http://192.168.1.1'
const api = new Api(cameraUrl)

const camera = {
  getInfo () {
    return new Promise((resolve, reject) => {
      oscGetCameraInfo()
        .then((cameraInfo) => {
          oscStartSession()
            .then(data => {
              resolve({
                cameraInfo,
                sessionId: data.results.sessionId
              })
            })
        })
        .catch((err) => {
          if (err.error.name === 'FetchError' && err.error.type === 'request-timeout') {
            reject(new Error('Not connected to camera'))
          }
        })
    })
  },
  takePicture (sessionId) {
    let sid = sessionId
    return new Promise((resolve, reject) => {
      verifyCameraSession(sessionId)
        .then(id => {
          sid = id
          oscTakePicture(id)
            .then(processImage)
            .then(saveCapturetoFS)
            .then(imageData => {
              resolve({
                ...imageData,
                sessionId: sid
              })
            })
        })
        .catch(error => { reject(error) })
    })
  }
}

export default camera

function verifyCameraSession (sessionId) {
  console.log('verifyCameraSession', sessionId)
  if (!sessionId) {
    return oscStartSession().then(data => data.results.sessionId)
  } else {
    return oscUpdateSession(sessionId).then(data => data.results.sessionId)
  }
}

// allows for the image to be processed by the camera, approx 6 seconds
function processImage (status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      oscCheckDoneStatus(status).then(status => {
        const {fileUri} = status.results
        oscGetImages().then(images => {
          const {results: {entries}} = images
          resolve({
            fileUri,
            name: entries[0].name,
            date: entries[0].dateTimeZone
          })
        })
      })
    }, 5000)
  })
}

function saveCapturetoFS (data) {
  console.log('TODO: SETUP FS STORAGE', data)
  return data
}

// Handlers
function oscGetCameraInfo () {
  console.log('oscGetCameraInfo')
  // set a short timeout so we don't keep the user waiting
  // (the local wifi connection to the camera will respond quickly)
  return api.get('osc/info', {timeout: 1000})
}

function oscStartSession () {
  console.log('oscStartSession')
  const command = {
    name: 'camera.startSession',
    parameters: {}
  }

  return api.post('osc/commands/execute', command)
}

function oscUpdateSession (sessionId) {
  console.log('oscUpdateSession', sessionId)
  const command = {
    name: 'camera.updateSession',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}

function oscGetImages () {
  console.log('oscGetImages')
  const command = {
    name: 'camera.listImages',
    parameters: {
      entryCount: 10,
      maxSize: 160
    }
  }

  return api.post('osc/commands/execute', command)
}

function oscTakePicture (sessionId) {
  console.log('oscTakePicture', sessionId)
  const command = {
    name: 'camera.takePicture',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}

async function oscCheckDoneStatus (status) {
  console.log('oscCheckDoneStatus')
  return oscGetStatus(status.id).then((nextStatus) => {
    if (nextStatus.state !== 'done') {
      return oscCheckDoneStatus(nextStatus)
    } else {
      return nextStatus
    }
  })
}

function oscGetStatus (id) {
  console.log('oscGetStatus', id)
  const command = {id}
  return api.post('osc/commands/status', command)
}
