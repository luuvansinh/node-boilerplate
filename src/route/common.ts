/**
 * Common routes
 * prefix: /
 */
import { Router } from 'express'
import controller from '../controller/common'

const router = Router()

/**
 * @api {get} /ping Ping server
 * @apiGroup Common
 * @apiName Ping
 */
router.get('/ping', controller.ping)

export default router
