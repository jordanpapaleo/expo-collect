import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import multi from 'redux-multi'

export function mockStore (initData) {
  const middlewares = [multi, thunk]
  const store = configureMockStore(middlewares)
  return store(initData)
}

export function beforeEach () {
  moxios.install()
  return true
}

export function afterEach () {
  moxios.uninstall()
  return true
}

export function mockSuccess (responseData = {}) {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent()
    request.respondWith({
      status: 200,
      statusText: 'OK',
      response: {
        data: { ...responseData }
      }
    })
  })
}

export function mockFailed (responseData = {}) {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent()
    request.respondWith({
      status: 200,
      statusText: 'NOTOK',
      response: {
        data: { ...responseData }
      }
    })
  })
}
