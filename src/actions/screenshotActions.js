import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT
} from '../constants/actionTypes'

export function addScreenshot (roomId, screenshot) {
  return (dispatch, getState) => {
    const state = getState()
    const {id: propertyId} = state

    dispatch(setSpinner(true))

    // screenshot.getCanvas seems to lock the browser while it is processing
    // which causes a signifigant lag in the loading spinner displaying.
    // if we wrap this code in a timeout with 0 as the duration if allows
    // the spinner to display before the getCanvas process locks the browser.
    // this is desirable as the user knows their click did something and they won't
    // click multiple times thinking nothing happened.

    // TODO Use a web worker

    setTimeout(() => {
      const entitiesToHide = document.querySelectorAll('a-cursor, a-circle')

      // hide the cursor and all hotspots
      entitiesToHide.forEach((entity) => {
        entity.setAttribute('visible', false)
      })

      const screenshotCanvas = document.querySelector('a-scene').components.screenshot.getCanvas('perspective')
      const uri = screenshotCanvas.toDataURL('png')

      // show the cursor and all hotspots again
      entitiesToHide.forEach((entity) => {
        entity.setAttribute('visible', true)
      })

      screenshot.note = {
        html: screenshot.note.toString('html'),
        markdown: screenshot.note.toString('markdown')
      }

      const postData = {
        uri,
        id: screenshot.id
      }

      // api.post(`screenshots/${propertyId}`, postData)
      //   .then((data) => {
      //     dispatch([
      //       {
      //         type: SCREENSHOT,
      //         payload: {
      //           roomId,
      //           screenshot: {
      //             ...screenshot,
      //             fileName: `${data.fileName}`
      //           }
      //         }
      //       },
      //       setSpinner(false),
      //       saveState()
      //     ])
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //     dispatch(setSpinner(false))
      //   })
    }, 0)
  }
}

export function updateScreenshot () {
  
}

export function deleteScreenshot (roomId, screenshot) {
  return (dispatch, getState) => {
    const state = getState()
    const {id} = state

    dispatch(setSpinner(true))

    // api.delete(`screenshots/${id}/${screenshot.fileName}`)
    //   .then(() => {
    //     dispatch([
    //       {
    //         type: DELETE_SCREENSHOT,
    //         payload: {
    //           roomId,
    //           screenshot
    //         }
    //       },
    //       setSpinner(false),
    //       saveState()
    //     ])
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //     dispatch(setSpinner(false))
    //   })
  }
}
