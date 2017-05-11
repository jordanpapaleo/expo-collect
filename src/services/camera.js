// import {saveCapture} from '../services/localDbUtils'
import Api from './Api'

const cameraUrl = 'http://192.168.1.1'
const api = new Api(cameraUrl)

export function getCameraInfo () {
  return new Promise((resolve, reject) => {
    oscGetCameraInfo()
      .then((cameraInfo) => {
        console.log('cameraInfo', cameraInfo)
        oscStartSession().then(
          (data) => {
            console.log('oscStartSession results', data)
            resolve({
              cameraInfo,
              sessionId: data.results.sessionId
            })
          },
          err => { reject(err) }
        )
      })
      .catch((err) => {
        console.error(err)
        if (err.error.name === 'FetchError' && err.error.type === 'request-timeout') {
          reject(new Error('Not connected to camera'))
        }
      })
  })
}

export function takePicture () {
  checkCameraConnection()
  verifyCameraSession()
  captureImage()
}

function checkCameraConnection (req, res, next) {
  console.log('checkCameraConnection')
  oscGetCameraInfo()
    .then((cameraInfo) => {
      req.body.cameraInfo = cameraInfo
      next()
    })
    .catch((status) => {
      next(status.error)
    })
}

function verifyCameraSession (req, res, next) {
  const {sessionId} = req.body
  console.log('verifyCameraSession', sessionId)
  if (!sessionId) {
    oscStartSession()
      .then((response) => {
        req.body.sessionId = response.results.sessionId
        next()
      })
  } else {
    // confirm session is still valid
    oscUpdateSession(sessionId)
      .then(() => {
        // session still valid and updated
        next()
      })
      .catch((status) => {
        // if sessionId is invalid then get a new one and move on
        if (status.state === 'error' && status.error.code === 'invalidSessionId') {
          oscStartSession()
            .then((response) => {
              req.body.sessionId = response.results.sessionId
              next()
            })
        } else {
          next(status)
        }
      })
  }
}

function captureImage (req, res) {
  const {sessionId, propertyId} = req.body
  console.log('captureImage', sessionId, propertyId)

  oscTakePicture(sessionId)
    .then((status) => {
      // allows for the image to be processed by the camera
      // approx 6 seconds
      setTimeout(() => {
        oscCheckDoneStatus(status)
          .then((status) => {
            const {fileUri} = status.results
            console.log('fileUri', fileUri)
            oscGetImages().then(images => {
              console.log('TODO: SETUP FS STORAGE')
            //   const {results: {entries}} = images
            //   saveCapture(propertyId, fileUri).then(
            //     (uri) => {
            //       res.json({
            //         sessionId,
            //         uri,
            //         name: entries[0].name,
            //         date: entries[0].dateTimeZone,
            //         hotspots: []
            //       })
            //     },
            //     (error) => { res.json({error}) }
            //   )
            })
          })
      }, 5000)
    })
    .catch(error => { res.json({error}) })
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

function oscCheckDoneStatus (status) {
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

function oscUpdateSession (sessionId) {
  console.log('oscUpdateSession', sessionId)
  const command = {
    name: 'camera.updateSession',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}
