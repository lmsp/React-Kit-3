import { SocketCluster } from 'socketcluster'
import path from 'path'

function initSocketCluster (socketCluster) {}

function startServer () {
  let socketCluster = new SocketCluster({
    workers: 1,
    stores: 1,
    port: 8090,
    appName: 'app',
    initController: path.join(__dirname, 'init.js'),
    workerController: path.join(__dirname, 'worker.js'),
    socketChannelLimit: 100,
    rebootWorkerOnCrash: true
  })
  initSocketCluster(socketCluster)
}

startServer()
