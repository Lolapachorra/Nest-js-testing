import { Task as Entity } from '@/domain/task/entities/task.entity';

import { Task } from '../entities/task';
export class TaskMapper {
  static toEntity(task: Task): Entity {
    return Entity.restore({
      id: task.id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }
  static toEntityArray(tasks: Task[]): Entity[] {
    return tasks.map((task) => this.toEntity(task));
  }
}
