/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import socketCluster from 'socketcluster-client'
import uuid from 'uuid'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { setClientId, setState, setConnectionState } from './actions'
import reducer from './reducer'
import App from './app.js'

// Se necesita para onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Esta función sirve sólo como ejemplo para probar flow
function createDivId (a: string, b: string, c: string) {
  return a + b + c
}

const remoteActionMiddleware = socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    action.clientId = store.getState().get('clientId')
    socket.emit('action', action)
  }
  return next(action)
}

let socket = socketCluster.connect({
  protocol: 'http',
  hostname: 'localhost',
  port: 8090
})
let stateChannel = socket.subscribe('state')
stateChannel.watch(function (state) {
  store.dispatch(setConnectionState(state, true))
  store.dispatch(setState(state))
})
socket.on('state', function (data, res) {
  store.dispatch(setConnectionState(data, true))
  store.dispatch(setState(data))
})
socket.on('error', err => store.dispatch(setConnectionState(err, true)))

function getClientId () {
  return uuid.v4()
}

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
const store = createStoreWithMiddleware(reducer)
store.dispatch(setClientId(getClientId()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(createDivId('a', 'p', 'p'))
)

if (module.hot) module.hot.accept()
