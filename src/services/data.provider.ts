import {Task} from "../models/task";
import {Model} from "../models";


/**
 * This class is a singleton that provides data storage and retrieval
 * for the application. It is a simple in-memory store that can be
 * replaced with a database or other data store.
 */
export class DataProvider {

  private static instance: DataProvider;
  // This will make sure we have unique IDs for each model,
  // even after deletion of records
  private  ids: { [key: string]: number } = {};
  private tasks: Task[] = [];

  private constructor() {}

  public static getInstance(): DataProvider {
    if (!DataProvider.instance) {
      DataProvider.instance = new DataProvider();
    }
    return DataProvider.instance;
  }

  /**
   * Returns a single record from the data store
   * @param model Name of the model
   * @param id ID of the record to fetch
   */
  public getOne(model: string, id: number){
    switch (model) {
      case Model.TASK:
        const task = this.tasks.find((task: any) => task.id === id);
        if (!task) {
          throw new Error(`Task with id ${id} not found`);
        }
        return task;
      default:
        throw new Error(`Model ${model} not supported`);
    }
  }

  /**
   * Returns all records of a model
   * @param model Name of the model
   */
  public getAll(model: string){
    switch (model) {
      case Model.TASK:
        return this.tasks;
      default:
        throw new Error(`Model ${model} not supported`);
    }
  }

  /**
   * Updates a record in the data store
   * @param model Name of the model
   * @param data Data to update
   */
  public update(model: string, data: any): any {
    switch (model) {
      case Model.TASK:
        const task = this.tasks.find((task: any) => task.id === data.id);
        if (!task) {
          throw new Error(`Task with id ${data.id} not found`);
        }
        Object.assign(task, data);
        return task;
      default:
        throw new Error(`Model ${model} not supported`);
    }
  }

  /**
   * Adds a record to the data store
   * @param model Name of the model
   * @param data Data to add
   */
  public add(model: string, data: any): any {
    switch (model) {
      case Model.TASK:
        data.id = (this.ids[Model.TASK] ?? 0) + 1; // incrementing ID
        this.ids[Model.TASK] = data.id;
        data.createdAt = new Date(); // current timestamp
        this.tasks.push(data);
        return data;
      default:
        throw new Error(`Model ${model} not supported`);
    }
  }


  /**
   * Deletes a record from the data store
   * @param model Name of the model
   * @param id ID of the record to delete
   */
  public delete(model: string, id: number): boolean {
    switch (model) {
      case Model.TASK:
        const task = this.tasks.find((task: any) => task.id === id);
        if (!task) {
          throw new Error(`Task with id ${id} not found`);
        }
        this.tasks = this.tasks.filter((task: any) => task.id !== id);
        return true;
      default:
        throw new Error(`Model ${model} not supported`);
    }
  }
}
