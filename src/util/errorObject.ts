import {Request} from 'express';
import responseMessage from '../constant/responseMessage';
import { Thttperror } from '../types/types';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';


// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default(err: Error | unknown, req: Request, errorStatusCode: number = 500): Thttperror => {
  const errorObj: Thttperror & { trace?: { error?: string | undefined } | null, request: { ip?: string | null, method: string, url: string } } = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? {error: err.stack} : null
  }

  //log
  // console.error(`CONTROLLER_ERROR`, {
  //   meta: errorObj
  // })

  //production Env check
  if(config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip
    delete errorObj.trace
  }

  return errorObj

}