import {NextFunction, Request, Response, Router} from 'express';
import Controller from "../controller";
import {TaskManagerService} from "../../services/task.manager.service";

/**
 * Status controller
 */
export default class TaskController extends Controller {

  /**
   * Register routes
   * @returns {Router}
   */
  public register(): Router {
    this.router.post('/task/', this.postTask.bind(this));
    this.router.get('/tasks', this.getTasks.bind(this));
    this.router.get('/task/:id', this.getSingleTask.bind(this));
    this.router.put('/task/:id', this.updateTask.bind(this));
    this.router.delete('/task/:id', this.deleteTask.bind(this));
    return this.router;
  }

  public postTask(req: Request, res: Response, next: NextFunction){
    try {
      const body = req.body;
      if (!body) {
        super.sendError(res, 'Task data is required', 400);
      }
      if (!body.dueDate){
        body.dueDate = new Date();
      } else {
        body.dueDate = new Date(body.dueDate);
      }
      res.locals.data = TaskManagerService.add(body);
      super.send(res);
    } catch (error) {
      next(error);
    }
  }

  public getTasks(req: Request, res: Response, next: NextFunction){
    try {
      res.locals.data = TaskManagerService.getAll();
      super.send(res);
    } catch (error) {
      next(error);
    }
  }

  public getSingleTask(req: Request, res: Response, next: NextFunction){
    try {
      res.locals.data = TaskManagerService.get(+req.params.id);
      super.send(res);
    } catch (error) {
      next(error);
    }
  }

  public updateTask(req: Request, res: Response, next: NextFunction){
    try {
      const body = req.body;
      if (!body) {
        super.sendError(res, 'Task data is required', 400);
      }
      if (!body.dueDate){
        body.dueDate = new Date();
      } else {
        body.dueDate = new Date(body.dueDate);
      }
      res.locals.data = TaskManagerService.update(body);
      super.send(res);
    } catch (error) {
      next(error);
    }
  }

  public deleteTask(req: Request, res: Response, next: NextFunction){
    try {
      const status = TaskManagerService.delete(+req.params.id);
      res.locals.data = {status, msg: 'Task deleted successfully'};
      super.send(res);
    } catch (error) {
      next(error);
    }
  }
}
