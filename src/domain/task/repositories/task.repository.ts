import { CreateTaskDTOS } from '../dtos/createTask.dtos';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  createTask(task: Task): Promise<Task>;
}
