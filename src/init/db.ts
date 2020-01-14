/* tslint:disable: no-console */

/**
 * Connect to database
 */

import config from '../config'
import mongoose from 'mongoose'

// Debug
// mongoose.set('debug', true)

export default async function () {
  try {
    await mongoose.connect(config.get('db') as string, config.getIn(['dbOptions']))
    console.log('- DATABASE'.padEnd(15), 'READY -', config.get('db'))
  } catch (error) {
    console.log('Error on connecting to db: ', error)
    console.log('\x1b[31m', '*** PLEASE CONNECT TO DATABASE BEFORE RUN SERVER', '\x1b[0m')
    process.exit(1)
  }
}
