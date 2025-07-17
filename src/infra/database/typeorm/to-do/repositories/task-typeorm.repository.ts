import { Task as DomainTask } from '@/domain/task/entities/task.entity';
import { ITaskRepository } from '@/domain/task/repositories/task.repository';
import { Repository } from 'typeorm';
import { Task as ORMTask } from '../entities/task';
import { toDo } from '../connection';
import { DatabaseError } from '@/domain/shared/errors/database.error';
import { TaskMapper } from '../mappers/task.mapper';

export class TaskTypeormRepository implements ITaskRepository {
  private readonly repo: Repository<ORMTask>;
  constructor() {
    if (!toDo.isInitialized) {
      throw new Error('DataSource not initialized');
    }
    this.repo = toDo.getRepository(ORMTask);
  }

  async createTask(task: DomainTask): Promise<DomainTask> {
    try {
      const ormTask = this.repo.create({
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });

      const saved = await this.repo.save(ormTask);
      return TaskMapper.toEntity(saved);
    } catch (e) {
      let error: Error | undefined = undefined;

      if (e instanceof Error) {
        error = e;
      }

      throw new DatabaseError('Falha ao criar task', error);
    }
  }
}
