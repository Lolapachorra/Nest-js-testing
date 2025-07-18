import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  createTask(task: Task): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
  findTaskById(taskId: number): Promise<Task | null>;
  getTasks(ids?: number[]): Promise<Task[]>;
}
