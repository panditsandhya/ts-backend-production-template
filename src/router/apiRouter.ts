import {Router} from 'express'
import apiController from '../controller/apiController'

const router = Router()

router.route('/test').get(apiController.test)
router.route('/health').get(apiController.health)

export default router