import {  NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import quicker from '../util/quicker'


export default {
    test: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS, { id: 'id' })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
          const healthData = {
            application: quicker.getApplicationHealth(),
            system: quicker.getSystemhealth(),
            timeStamp: Date.now()
          }
            httpResponse(req, res, 200, responseMessage.SUCCESS,healthData )
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
