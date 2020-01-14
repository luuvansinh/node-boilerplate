/* tslint:disable: no-console */
import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import methodOverride from 'method-override'
import compress from 'compression'
import helmet from 'helmet'
import { EventEmitter } from 'events'
import multiCores from './multi-cores'
import { localesKey } from './locales'
import init from './init'
import route from './route'
import { response, env } from './utils'

const mediator = new EventEmitter()
const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// 3rd party middleware
app.use(cors())
app.use(compress())
app.use(methodOverride())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(helmet())
app.use('/static', express.static(path.join(process.cwd(), 'uploads')))
app.use('/', express.static(path.join(process.cwd(), 'apidoc')))

if (process.env.NODE_ENV !== 'test') {
  require('dotenv').config()
}

// DOC
app.get('/apidoc', (req, res) => {
  if (env.isProduction) {
    res.json({ error: 'Not found' })
  } else {
    res.sendFile(path.join(`${process.cwd()}/apidoc/index.html`))
  }
})

// set multi cores
multiCores(app, mediator)

mediator.once('boot.ready', async () => {
  console.log('- BOOT'.padEnd(15), 'READY - ENV', process.env.NODE_ENV || 'development')
  await init(mediator)
  app.use(route())

  // Default locale to return error
  const defaultLocale = 'vi'

  // catch 404 and forward to error handler
  app.use((req, res) => {
    console.log('404', req.url)
    return response.r404(res, defaultLocale, localesKey.common.apiNotFound)
  })

  // error handler
  app.use((error, req, res) => {
    console.log('500', error)
    return response.r500(res, defaultLocale)
  })
})

export default app

export {
  mediator,
}
