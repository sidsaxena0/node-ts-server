import * as util from 'util';
import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError, {IError} from "../abstraction/api-error";

/**
 * Add error handler middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
const addErrorHandler = (
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err) {
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(`REQUEST HANDLING ERROR:
        \nERROR:\n${JSON.stringify(err)}
        \nREQUEST HEADERS:\n${util.inspect(req.headers)}
        \nREQUEST PARAMS:\n${util.inspect(req.params)}
        \nREQUEST QUERY:\n${util.inspect(req.query)}
        \nBODY:\n${util.inspect(req.body)}`);
    let body: IError | string = {
      fields: err.fields,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status,
    };
    res.status(status);
    res.send(body);
  }
  next();
};

export default addErrorHandler;
