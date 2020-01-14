/* tslint:disable: no-console */

// import { exec } from 'child_process'
import http from 'http'
import net from 'net'
import cluster from 'cluster'
import farmhash from 'farmhash'
import { env } from './utils'

// const NUMCPUS = os.cpus().length // Don't use this code anymore, due to memory problems
const NUMCPUS = process.env.WORKERS || 2
const debug = require('debug')('App')

const globalAny: any = global

globalAny.CronjobServerId = -1

export default (app, mediator) => {
  // Set port
  app.set('port', process.env.PORT || '7020')

  // Create HTTP server
  let server: any = http.createServer(app)

  if (!env.isProduction) {
    server.listen(app.get('port'))

    // SocketIO
    // socketIO(server, mediator)

    // Index db data flag
    globalAny.IsIndexesServer = true

    // Emit to connect db
    setImmediate(() => {
      mediator.emit('boot.ready')
    })

    console.log(`Server started on port ${app.get('port')}`)
    return
  }

  // Set cluster
  if (cluster.isMaster) {
    console.log(`Server started on port ${app.get('port')}`)
    const workers = []

    // Helper function, spawn worker when it died
    const spawn = (i) => {
      workers[i] = cluster.fork()
      if (globalAny.CronjobServerId === -1) {
        globalAny.CronjobServerId = i
        workers[i].send({ isCronJobServer: true })
      }

      // Optional: Restart worker on exit
      workers[i].on('exit', () => {
        if (i === globalAny.CronjobServerId) {
          globalAny.CronjobServerId = -1
        }
        debug(`worker pid ${workers[i] && workers[i].process ? workers[i].process.pid : 'UNDEFINED'} died, restarting...`)
        spawn(i)
      })
    }

    // Spawn workers.
    for (let i = 0; i < NUMCPUS; i += 1) {
      spawn(i)
    }

    // Helper function, get worker index base on ip
    const workerIndex = (ip, len) => {
      return farmhash.fingerprint32(ip) % len
    }

    // Create the outside facing server listening on our port.
    server = net.createServer({
      pauseOnConnect: true,
    }, (connection) => {
      // const worker = workers[workerIndex(connection.remoteAddress, NUMCPUS)]
      const worker = workers[workerIndex(process.env.SERVER_IP, NUMCPUS)]
      worker.send('sticky-session:connection', connection)
    }).listen(app.get('port'))
  } else {
    server = app.listen(0, () => {
      // SocketIO
      // socketIO(server, mediator)
      process.send('ready')
    })

    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', (message, connection) => {
      if (message.isCronJobServer) {
        globalAny.IsIndexesServer = true
      }

      // Emit to connect db
      setImmediate(() => {
        mediator.emit('boot.ready')
      })

      // Handle cronjob server
      if (message.isCronJobServer) {
        console.log('********************************************************************')
        console.log(`*** THIS IS A CRONJOB SERVER WITH WORKER ID ${cluster.worker.id} ***`)
        console.log('********************************************************************')
        globalAny.IsCronJobServer = true
      }

      if (message !== 'sticky-session:connection') {
        return
      }

      // Emulate a connection event on the server by emitting the
      // event with the connection the master sent us.
      server.emit('connection', connection)

      connection.resume()
    })
  }


  // server.on('error', onError)
  server.on('close', () => {
    console.log('SERVER CLOSED')
  })
}
