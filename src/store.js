import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import logger from 'redux-logger'
import rootReducer from './reducers'

export function configureStore (initialState = {}) {
  const middleware = [thunk, multi]

  if (__DEV__) {
    middleware.push(logger)
  }

  const enhancers = [applyMiddleware(...middleware)]
  const store = createStore(rootReducer, initialState, compose(...enhancers))

  store.subscribe(() => {
    // const state = store.getState()
    // console.info('state', state)
  })

  return store
}
