import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { Thttpresponse } from '../types/types';
import {Request, Response} from 'express'
import logger from './logger';

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
  const response: Thttpresponse =  {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
      
    },
    message: responseMessage,
    data: data
  }

  //log
  logger.info(`CONTROLLER_RESPONSE`, {
    meta: response
  })

  //Production Env check
  if(config.ENV === EApplicationEnvironment.PRODUCTION){
    delete response.request.ip
  }

  res.status(responseStatusCode).json(response)
}