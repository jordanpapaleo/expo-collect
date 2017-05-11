export default class Api {
  static headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charser=utf-8'
  }

  static timeout = 120000

  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  request (url, options, passThrough) {
    return fetch(url, options).then(
      async (response) => {
        if (response.ok) {
          let data = await response.json()

          if (passThrough) {
            data = {
              ...passThrough,
              ...data
            }
          }

          return data
        } else {
          throw new Error(`${response.status} ${response.statusText}`)
        }
      },
      (err) => {
        console.log('fetch err', err)
        throw new Error('Call Failed')
      }
    )
  }

  get (url, passThrough, timeout = Api.timeout) {
    const {headers} = Api
    const {request, baseUrl} = this
    const options = {
      timeout,
      headers: headers,
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  post (url, data, passThrough, timeout = Api.timeout) {
    const {headers} = Api
    const {request, baseUrl} = this
    const options = {
      timeout,
      headers,
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  put (url, data, passThrough, timeout = Api.timeout) {
    const {headers} = Api
    const {request, baseUrl} = this
    const options = {
      timeout,
      headers,
      body: JSON.stringify(data),
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }

  delete (url, passThrough, timeout = Api.timeout) {
    const {headers} = Api
    const {request, baseUrl} = this
    const options = {
      timeout,
      headers,
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseUrl}/${url}`, options, passThrough)
  }
}
