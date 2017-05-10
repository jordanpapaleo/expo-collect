import fetch from 'fetch'
const baseURL = ''
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charser=utf-8'
}

const TIMEOUT = 120000

function request (url, options, passThrough) {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(
      (response) => {
        if (response.statusText === 'OK') {
          if (passThrough) {
            response.data = {
              ...response.data,
              ...passThrough
            }
          }
          resolve(response.data)
        } else {
          reject(new Error(`${response.status} ${response.statusText}`))
        }
      },
      (err) => {
        reject(new Error(err.response))
      }
    )
  })
}

export const api = {
  get (url, passThrough, timeout = TIMEOUT) {
    const options = {
      timeout,
      headers: HEADERS,
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  post (url, data, passThrough, timeout = TIMEOUT) {
    const options = {
      data,
      timeout,
      headers: HEADERS,
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  put (url, data, passThrough, timeout = TIMEOUT) {
    const options = {
      data,
      timeout,
      headers: HEADERS,
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  delete (url, passThrough, timeout = TIMEOUT) {
    const options = {
      timeout,
      headers: HEADERS,
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  }
}
