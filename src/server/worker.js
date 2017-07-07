import Express from 'express'
import makeStore from './store'

export function run (worker) {
  console.log('Inicio servidor')

  const store = makeStore()

  var app = Express()

  var httpServer = worker.getHTTPServer()

  var scServer = worker.getSCServer()

  httpServer.on('request', app)

  store.subscribe(() => {
    console.log('Publicado el estado: ')
    console.log(store.getState().toJS())
    scServer.exchange.publish('state', store.getState().toJS())
  })

  scServer.on('connection', socket => {
    console.log('Nueva conexión: ')
    console.log(store.getState().toJS())
    socket.emit('state', store.getState().toJS())
    socket.on('action', action => {
      console.log('Nueva acción: ' + JSON.stringify(action))
      store.dispatch(action)
    })
  })

  store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
  })
  store.dispatch({ type: 'NEXT' })
}
