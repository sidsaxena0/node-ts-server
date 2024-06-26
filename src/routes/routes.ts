import { Router } from 'express';
import TaskController from "../controllers/tasks/task.controller";

/**
 * Here, you can register routes by instantiating the controller.
 */
export default function registerRoutes(): Router {
  const router = Router();

  const controllers = [
    new TaskController(),
  ];


  // Dynamically register routes for each controller
  controllers.forEach((controller) => {
    // make sure each controller has basePath attribute and register() method
    router.use(`/v1/`, controller.register());
  });

  return router;
}
