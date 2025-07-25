import {NextFunction, Request, Response} from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'

export default {
  test: (req: Request, res:Response, next: NextFunction) => {
   try {

     httpResponse(req,res,200, responseMessage.SUCCESS, {id: 'id'})
    
   } catch(err){
    httpError(next, err, req, 500)
   }
  }
}