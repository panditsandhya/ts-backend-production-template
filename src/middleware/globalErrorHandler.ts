import {  NextFunction, Request, Response } from 'express';
import { Thttperror } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Thttperror, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode).json(err)
}