import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Base controller class
 * @class Controller
 * @abstract
 */
export default abstract class Controller {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  /**
   * Register routes
   */
  public abstract register(): void;

  /**
   * Global method to send API response
   * @param res
   * @param statusCode
   */
  public send(res: Response, statusCode: number = StatusCodes.OK): void {
    let obj = {};
    obj = res.locals.data;
    res.status(statusCode).send(obj);
  }

  /**
   * Global method to send API response
   * @param res
   * @param msg
   * @param statusCode
   */
  public sendError(res: Response, msg: String, statusCode: number = StatusCodes.OK): void {
    res.status(statusCode).send({
      msg,
    });
  }
}
