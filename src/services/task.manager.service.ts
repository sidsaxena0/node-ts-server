import {Task, TaskStatus} from "../models/task";
import {DataProvider} from "./data.provider";
import {Model} from "../models";

/**
 * Task manager service class
 * Contains methods for managing tasks in the data store
 * @class
 */
export class TaskManagerService {
  static validateTask(task: Task) {
    if (!task.title) {
      throw new Error('Task title is required');
    }
    if (!task.description) {
      throw new Error('Task description is required');
    }
    if (!task.dueDate) {
      throw new Error('Task due date is required');
    } else if (task.dueDate < new Date()) {
      throw new Error('Task due date must be in the future');
    }
    if (!task.assignedTo) {
      throw new Error('Task assigned to is required');
    }
    if (!task.status) {
      throw new Error('Task status is required');
    }
  }

  /**
   * Adds a task to the data store
   * @param body Task data
   * @returns Added task
   */
  static add(body: any): Task {
    const task = {...body, status: TaskStatus.PENDING};
    TaskManagerService.validateTask(task);
    return DataProvider.getInstance().add(Model.TASK, task);
  }

  /**
   * Updates a task in the data store
   * @param task Task data
   * @param id Task ID
   * @returns Updated task
   */
static update(task: Task, id: number): Task {
    TaskManagerService.validateTask(task);
    return DataProvider.getInstance().update(Model.TASK, task, id);
  }

  /**
   * Deletes a task from the data store
   * @param id Task ID
   * @returns True if successful
   */
  static delete(id: number): boolean {
    return DataProvider.getInstance().delete(Model.TASK, id);
  }

  /**
   * Gets a task from the data store
   * @param id Task ID
   * @returns Task
   */
  static get(id: number): Task {
    return DataProvider.getInstance().getOne(Model.TASK, id);
  }

  /**
   * Gets all tasks from the data store
   * @param page Page number
   * @param pageSize Page size
   * @param filter Filter object
   * @returns List of tasks
   */
  static getAll(page: number = 1, pageSize: number = 10, filter: any = {}): Task[] {
    return DataProvider.getInstance().getAll(Model.TASK, page, pageSize, filter);
  }

}
